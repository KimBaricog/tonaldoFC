import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  checkIsAdmin,
  getSession,
  onAuthChange,
  signOut,
} from "../services/adminService";
import AdminLayout from "../components/admin/AdminLayout";
import LoginForm from "../components/admin/LoginForm";
import DashboardHome from "../components/admin/DashboardHome";
import GalleryManager from "../components/admin/GalleryManager";
import CoachManager from "../components/admin/CoachManager";
import SponsorManager from "../components/admin/SponsorManager";
import AdminAccounts from "../components/admin/AdminAccounts";
import "./style/admin.css";

const TABS = ["dashboard", "gallery", "coaches", "sponsors", "admins"];
const tabFromHash = () => {
  const h = window.location.hash.slice(1);
  return TABS.includes(h) ? h : "dashboard";
};

// Simple centred screen for the loading / error states
const Screen = ({ children }) => <div className="adm-screen">{children}</div>;

export default function AdminPage() {
  const [session, setSession] = useState(undefined); // undefined = still checking
  const [allowed, setAllowed] = useState(null); // null = checking, true/false after the admin check
  const [tab, setTab] = useState(tabFromHash);

  useEffect(() => {
    document.title = "Admin · Tonaldo FC";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    getSession().then(setSession);
    return onAuthChange(setSession);
  }, []);

  // Keyed on the user id (not the session object) so refreshing a token or changing a password doesn't re-run the check
  const userId = session?.user?.id;
  useEffect(() => {
    if (!userId) {
      setAllowed(null);
      return;
    }
    checkIsAdmin()
      .then(setAllowed)
      .catch(() => setAllowed(false));
  }, [userId]);

  if (!supabase)
    return (
      <Screen>
        <div className="adm-card">
          <h1>Admin not set up yet</h1>
          <p>
            Add <code>VITE_SUPABASE_URL</code> and{" "}
            <code>VITE_SUPABASE_ANON_KEY</code> to your environment variables,
            then restart.
          </p>
        </div>
      </Screen>
    );
  if (session === undefined)
    return (
      <Screen>
        <p className="adm-muted">Loading…</p>
      </Screen>
    );
  if (!session) return <LoginForm />;
  if (allowed === null)
    return (
      <Screen>
        <p className="adm-muted">Checking access…</p>
      </Screen>
    );
  if (!allowed)
    return (
      <Screen>
        <div className="adm-card">
          <h1>No access</h1>
          <p>
            This account isn't an admin. Sign out and use the admin account.
          </p>
          <button className="btn" onClick={signOut}>
            Sign out
          </button>
        </div>
      </Screen>
    );

  return (
    <AdminLayout tab={tab} email={session.user.email} onSignOut={signOut}>
      {tab === "dashboard" && <DashboardHome />}
      {tab === "gallery" && <GalleryManager />}
      {tab === "coaches" && <CoachManager />}
      {tab === "sponsors" && <SponsorManager />}
      {tab === "admins" && <AdminAccounts email={session.user.email} />}
    </AdminLayout>
  );
}
