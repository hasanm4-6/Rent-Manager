// assets
import { DashboardOutlined } from '@ant-design/icons';
import { Users } from "lucide-react";

// icons
const icons = {
  DashboardOutlined,
  Users
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //


const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'Users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.Users,
      breadcrumbs: false
    },
    {
      id: 'Tenants',
      title: 'Tenants',
      type: 'item',
      url: '/tenants',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
