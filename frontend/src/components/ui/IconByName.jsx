import {
  Building2, Network, Hammer, Droplets, Zap, Trash2, Trees,
  Calendar, FileText, Shield, ClipboardList, PencilRuler, Truck, HardHat,
  BadgeCheck, KeyRound, ShieldCheck, Globe2, AlertTriangle, Search, GraduationCap,
  Siren, UserCheck, ShieldAlert, Ban, Award, ScrollText, PackageCheck, Layers,
  ClipboardCheck, Activity, Users, FileText as FileTextIcon, TrendingUp,
  Leaf, Recycle, Droplet, Sun, TreePine, Map, LayoutGrid, Handshake, Cpu,
  Construction, PackageOpen, Drill, PlugZap, ArrowRight, CheckCircle2,
  Phone, Mail, MapPin, Clock, ChevronRight, ChevronDown, Menu, X, Facebook,
  Twitter, Linkedin, Instagram, ArrowUpRight,
} from "lucide-react";

const map = {
  Building2, Network, Hammer, Droplets, Zap, Trash2, Trees,
  Calendar, FileText, Shield, ClipboardList, PencilRuler, Truck, HardHat,
  BadgeCheck, KeyRound, ShieldCheck, Globe2, AlertTriangle, Search, GraduationCap,
  Siren, UserCheck, ShieldAlert, Ban, Award, ScrollText, PackageCheck, Layers,
  ClipboardCheck, Activity, Users, TrendingUp,
  Leaf, Recycle, Droplet, Sun, TreePine, Map, LayoutGrid, Handshake, Cpu,
  Construction, PackageOpen, Drill, PlugZap, ArrowRight, CheckCircle2,
  Phone, Mail, MapPin, Clock, ChevronRight, ChevronDown, Menu, X, Facebook,
  Twitter, Linkedin, Instagram, ArrowUpRight,
};

export default function IconByName({ name, className = "h-6 w-6", strokeWidth = 1.75 }) {
  const Cmp = map[name] || Building2;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
