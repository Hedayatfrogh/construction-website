// Minimal SQLite-backed model with the subset of the Mongoose API used by
// the controllers: find, findOne, findById, create, insertMany,
// findByIdAndUpdate, findByIdAndDelete, countDocuments, and the chainable
// query helpers select / populate / sort.
const crypto = require('crypto');
const { getDb, registerModel } = require('../config/db');

const registry = {};

const SQL_TYPES = {
  string: 'TEXT',
  boolean: 'INTEGER',
  date: 'TEXT',
  ref: 'TEXT',
  json: 'TEXT',
};

const validationError = (message) => {
  const err = new Error(message);
  err.statusCode = 400;
  err.status = 'fail';
  return err;
};

const newId = () => crypto.randomBytes(12).toString('hex');

const isEmpty = (v) => v === undefined || v === null || v === '';

// Normalises an incoming value according to the field definition.
const castValue = (key, def, value) => {
  if (value === undefined || value === null) return value;
  switch (def.type) {
    case 'string':
    case 'ref': {
      let v = String(value);
      if (def.trim) v = v.trim();
      if (def.lowercase) v = v.toLowerCase();
      if (def.uppercase) v = v.toUpperCase();
      return v;
    }
    case 'boolean':
      if (value === 'true') return true;
      if (value === 'false') return false;
      return Boolean(value);
    case 'date': {
      if (value === '') return null;
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) throw validationError(`Invalid date for ${key}`);
      return d.toISOString();
    }
    default:
      return value;
  }
};

const toColumn = (def, value) => {
  if (value === undefined || value === null) return null;
  if (def.type === 'boolean') return value ? 1 : 0;
  if (def.type === 'json') return JSON.stringify(value);
  return value;
};

const fromColumn = (def, value) => {
  if (value === undefined || value === null) return value === undefined ? undefined : null;
  if (def.type === 'boolean') return Boolean(value);
  if (def.type === 'json') return JSON.parse(value);
  return value;
};

const validateField = (key, def, value) => {
  if (def.required && isEmpty(value)) {
    throw validationError(typeof def.required === 'string' ? def.required : `${key} is required`);
  }
  if (def.enum && !isEmpty(value)) {
    const values = Array.isArray(def.enum) ? def.enum : def.enum.values;
    if (!values.includes(value)) {
      throw validationError((!Array.isArray(def.enum) && def.enum.message) || `Invalid ${key}`);
    }
  }
};

const wrapSqlError = (err) => {
  if (err && /UNIQUE constraint failed: \w+\.(\w+)/.test(err.message)) {
    const field = err.message.match(/UNIQUE constraint failed: \w+\.(\w+)/)[1];
    return validationError(`Duplicate value for field "${field}". Please use another value.`);
  }
  return err;
};

class Query {
  constructor(model, single, filter) {
    this.model = model;
    this.single = single;
    this.filter = filter || {};
    this.selection = '';
    this.populates = [];
    this.order = null;
  }

  select(selection) {
    this.selection = selection || '';
    return this;
  }

  populate(field) {
    this.populates.push(field);
    return this;
  }

  sort(order) {
    this.order = order;
    return this;
  }

  async exec() {
    const docs = this.model._query(this.filter, {
      order: this.order,
      limit: this.single ? 1 : null,
      selection: this.selection,
    });
    for (const field of this.populates) {
      const def = this.model.fields[field];
      const refModel = def && def.ref && registry[def.ref];
      if (!refModel) continue;
      for (const doc of docs) {
        if (doc[field]) doc[field] = (await refModel.findById(doc[field])) || null;
      }
    }
    return this.single ? docs[0] || null : docs;
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().catch(reject);
  }
}

const defineModel = (name, table, fields) => {
  const columns = Object.keys(fields);
  const quoted = (c) => `"${c}"`;
  let tableReady = false;

  const model = {
    modelName: name,
    table,
    fields,

    ensureTable() {
      if (tableReady) return;
      const db = getDb();
      const columnSql = columns.map((c) => {
        const def = fields[c];
        return `${quoted(c)} ${SQL_TYPES[def.type] || 'TEXT'}${def.unique ? ' UNIQUE' : ''}`;
      });
      db.exec(
        `CREATE TABLE IF NOT EXISTS ${quoted(table)} (
          "_id" TEXT PRIMARY KEY,
          ${columnSql.join(',\n          ')},
          "createdAt" TEXT NOT NULL,
          "updatedAt" TEXT NOT NULL
        )`
      );
      // Add columns introduced after the table was first created.
      const existing = db.prepare(`PRAGMA table_info(${quoted(table)})`).all().map((r) => r.name);
      columns
        .filter((c) => !existing.includes(c))
        .forEach((c) => {
          db.exec(`ALTER TABLE ${quoted(table)} ADD COLUMN ${quoted(c)} ${SQL_TYPES[fields[c].type] || 'TEXT'}`);
        });
      columns.forEach((c) => {
        const def = fields[c];
        if (def.default === undefined) return;
        const value = typeof def.default === 'function' ? def.default() : def.default;
        db.prepare(`UPDATE ${quoted(table)} SET ${quoted(c)} = ? WHERE ${quoted(c)} IS NULL`)
          .run(toColumn(def, castValue(c, def, value)));
      });
      tableReady = true;
    },

    _toDoc(row, selection = '') {
      const doc = { _id: row._id };
      const include = selection.split(/\s+/).filter((s) => s.startsWith('+')).map((s) => s.slice(1));
      const exclude = selection.split(/\s+/).filter((s) => s.startsWith('-')).map((s) => s.slice(1));
      columns.forEach((c) => {
        const def = fields[c];
        if (exclude.includes(c)) return;
        if (def.select === false && !include.includes(c)) return;
        const v = fromColumn(def, row[c]);
        if (v !== undefined) doc[c] = v;
      });
      doc.createdAt = row.createdAt;
      doc.updatedAt = row.updatedAt;
      doc.id = row._id;
      Object.defineProperty(doc, 'toObject', { value: () => ({ ...doc }), enumerable: false });
      return doc;
    },

    _where(filter) {
      const clauses = [];
      const params = [];
      Object.entries(filter || {}).forEach(([key, value]) => {
        const col = key === 'id' ? '_id' : key;
        if (col !== '_id' && !fields[col]) return;
        const def = col === '_id' ? { type: 'string' } : fields[col];
        clauses.push(`${quoted(col)} = ?`);
        params.push(toColumn(def, castValue(col, def, value)));
      });
      return { sql: clauses.length ? ` WHERE ${clauses.join(' AND ')}` : '', params };
    },

    _query(filter, { order, limit, selection } = {}) {
      this.ensureTable();
      const { sql, params } = this._where(filter);
      let orderSql = ' ORDER BY rowid ASC';
      if (order && typeof order === 'object') {
        const parts = Object.entries(order)
          .filter(([k]) => k === 'createdAt' || k === 'updatedAt' || fields[k])
          .map(([k, dir]) => `${quoted(k)} ${Number(dir) < 0 || dir === 'desc' ? 'DESC' : 'ASC'}`);
        if (parts.length) orderSql = ` ORDER BY ${parts.join(', ')}`;
      }
      const limitSql = limit ? ` LIMIT ${Number(limit)}` : '';
      const rows = getDb()
        .prepare(`SELECT * FROM ${quoted(table)}${sql}${orderSql}${limitSql}`)
        .all(...params);
      return rows.map((r) => this._toDoc(r, selection));
    },

    find(filter) {
      return new Query(this, false, filter);
    },

    findOne(filter) {
      return new Query(this, true, filter);
    },

    findById(id) {
      return new Query(this, true, { _id: String(id) });
    },

    async create(data) {
      this.ensureTable();
      const now = new Date().toISOString();
      const values = {};
      columns.forEach((c) => {
        const def = fields[c];
        let v = castValue(c, def, data ? data[c] : undefined);
        if (isEmpty(v) && def.default !== undefined) {
          v = typeof def.default === 'function' ? def.default() : def.default;
        }
        validateField(c, def, v);
        values[c] = v;
      });
      const id = newId();
      try {
        getDb()
          .prepare(
            `INSERT INTO ${quoted(table)} ("_id", ${columns.map(quoted).join(', ')}, "createdAt", "updatedAt")
             VALUES (?, ${columns.map(() => '?').join(', ')}, ?, ?)`
          )
          .run(id, ...columns.map((c) => toColumn(fields[c], values[c])), now, now);
      } catch (err) {
        throw wrapSqlError(err);
      }
      return this.findById(id);
    },

    async insertMany(list) {
      const created = [];
      for (const item of list) created.push(await this.create(item));
      return created;
    },

    async findByIdAndUpdate(id, data) {
      this.ensureTable();
      const updates = {};
      Object.keys(data || {}).forEach((c) => {
        const def = fields[c];
        if (!def) return;
        const v = castValue(c, def, data[c]);
        validateField(c, def, v);
        updates[c] = v;
      });
      const keys = Object.keys(updates);
      const setSql = [...keys.map((k) => `${quoted(k)} = ?`), '"updatedAt" = ?'].join(', ');
      let result;
      try {
        result = getDb()
          .prepare(`UPDATE ${quoted(table)} SET ${setSql} WHERE "_id" = ?`)
          .run(...keys.map((k) => toColumn(fields[k], updates[k])), new Date().toISOString(), String(id));
      } catch (err) {
        throw wrapSqlError(err);
      }
      if (!result.changes) return null;
      return this.findById(id);
    },

    async findByIdAndDelete(id) {
      const doc = await this.findById(id);
      if (!doc) return null;
      getDb().prepare(`DELETE FROM ${quoted(table)} WHERE "_id" = ?`).run(String(id));
      return doc;
    },

    async deleteMany(filter) {
      this.ensureTable();
      const { sql, params } = this._where(filter);
      const result = getDb().prepare(`DELETE FROM ${quoted(table)}${sql}`).run(...params);
      return { deletedCount: Number(result.changes) };
    },

    async countDocuments(filter) {
      this.ensureTable();
      const { sql, params } = this._where(filter);
      const row = getDb().prepare(`SELECT COUNT(*) AS n FROM ${quoted(table)}${sql}`).get(...params);
      return Number(row.n);
    },
  };

  registry[name] = model;
  registerModel(model);
  return model;
};

module.exports = defineModel;
