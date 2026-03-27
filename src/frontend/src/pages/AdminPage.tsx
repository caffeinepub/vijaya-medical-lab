import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Key, Loader2, LogOut, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ContactSubmission } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { getSecretParameter, storeSessionParameter } from "../utils/urlParams";

export default function AdminPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminToken, setAdminToken] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState("");
  const autoClaimAttempted = useRef(false);

  // Auto-read admin token from URL hash on mount
  useEffect(() => {
    const tokenFromUrl = getSecretParameter("caffeineAdminToken");
    if (tokenFromUrl) {
      setAdminToken(tokenFromUrl);
    }
  }, []);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .isCallerAdmin()
      .then((v) => setIsAdmin(v))
      .catch(() => setIsAdmin(false));
  }, [actor, isFetching]);

  // Auto-claim admin if token is in URL and user just logged in
  useEffect(() => {
    if (
      !actor ||
      isFetching ||
      isAdmin !== false ||
      !adminToken ||
      autoClaimAttempted.current
    )
      return;
    autoClaimAttempted.current = true;
    handleClaimAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, actor, isFetching, adminToken]);

  const handleClaimAdmin = async () => {
    if (!actor || !adminToken.trim()) return;
    setClaiming(true);
    setClaimError("");
    try {
      storeSessionParameter("caffeineAdminToken", adminToken.trim());
      await actor._initializeAccessControlWithSecret(adminToken.trim());
      await queryClient.invalidateQueries({ queryKey: ["actor"] });
      await queryClient.refetchQueries({ queryKey: ["actor"] });
      setIsAdmin(null);
    } catch {
      setClaimError(
        "Invalid token or admin already assigned to another account.",
      );
    } finally {
      setClaiming(false);
    }
  };

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching && isAdmin === true,
  });

  const formatDate = (timestamp: bigint) => {
    const ms = Number(timestamp / 1_000_000n);
    return new Date(ms).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <header className="border-b border-white/5 bg-[#111111] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="text-[#A0A0A0] hover:text-white flex items-center gap-2 text-sm transition-colors"
            data-ocid="admin.link"
          >
            <ArrowLeft size={16} /> Back to Site
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            <span className="font-heading font-bold text-lg">
              Dripszy Admin
            </span>
          </div>
        </div>
        {identity && (
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="text-xs border-primary/40 text-primary"
            >
              {identity.getPrincipal().toString().slice(0, 12)}...
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={clear}
              className="gap-2 border-white/10 text-white"
              data-ocid="admin.button"
            >
              <LogOut size={14} /> Logout
            </Button>
          </div>
        )}
      </header>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {!identity && (
          <div
            className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
            data-ocid="admin.panel"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center glow-blue-sm">
              <Shield size={32} className="text-primary" />
            </div>
            <div className="text-center">
              <h1 className="font-heading text-3xl font-bold mb-2">
                Admin Access Required
              </h1>
              <p className="text-[#A0A0A0]">
                Log in with Internet Identity to access the admin dashboard.
              </p>
              {adminToken && (
                <p className="text-green-400 text-sm mt-2">
                  Admin token detected — log in to complete setup.
                </p>
              )}
            </div>
            <Button
              onClick={login}
              disabled={loginStatus === "logging-in"}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 glow-blue-sm"
              data-ocid="admin.primary_button"
            >
              {loginStatus === "logging-in" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                  in...
                </>
              ) : (
                "Login with Internet Identity"
              )}
            </Button>
          </div>
        )}
        {identity && isAdmin === false && (
          <div
            className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
            data-ocid="admin.error_state"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center glow-blue-sm">
              <Key size={32} className="text-primary" />
            </div>
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold mb-2">
                Enter Admin Token
              </h2>
              <p className="text-[#A0A0A0] max-w-md">
                Enter the admin token to claim admin access for your account.
              </p>
            </div>
            <div className="w-full max-w-sm flex flex-col gap-3">
              <Input
                type="password"
                placeholder="Paste your admin token here"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                className="bg-[#111111] border-white/10 text-white placeholder:text-[#555]"
                data-ocid="admin.input"
              />
              {claimError && (
                <p
                  className="text-red-400 text-sm"
                  data-ocid="admin.error_state"
                >
                  {claimError}
                </p>
              )}
              <Button
                onClick={handleClaimAdmin}
                disabled={claiming || !adminToken.trim()}
                className="bg-primary hover:bg-primary/90 text-white glow-blue-sm"
                data-ocid="admin.primary_button"
              >
                {claiming ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Claiming...
                  </>
                ) : (
                  "Claim Admin Access"
                )}
              </Button>
            </div>
            <p className="text-[#555] text-xs text-center max-w-sm">
              The admin token was in your deployment link. If lost, ask Caffeine
              support to redeploy and share the new link.
            </p>
          </div>
        )}
        {identity && isAdmin === null && (
          <div
            className="flex items-center justify-center min-h-[60vh]"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {identity && isAdmin === true && (
          <div data-ocid="admin.panel">
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold mb-2">
                Contact Submissions
              </h1>
              <p className="text-[#A0A0A0]">
                All form submissions from the Dripszy website.
              </p>
            </div>
            {isLoading ? (
              <div
                className="flex items-center justify-center py-20"
                data-ocid="admin.loading_state"
              >
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !submissions || submissions.length === 0 ? (
              <div
                className="text-center py-20 text-[#A0A0A0]"
                data-ocid="admin.empty_state"
              >
                <p className="text-lg">No submissions yet.</p>
                <p className="text-sm mt-2">
                  Form submissions will appear here.
                </p>
              </div>
            ) : (
              <div
                className="rounded-xl border border-white/8 overflow-hidden"
                data-ocid="admin.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#111111] border-white/8">
                      <TableHead className="text-[#A0A0A0]">#</TableHead>
                      <TableHead className="text-[#A0A0A0]">Name</TableHead>
                      <TableHead className="text-[#A0A0A0]">Email</TableHead>
                      <TableHead className="text-[#A0A0A0]">Phone</TableHead>
                      <TableHead className="text-[#A0A0A0]">Message</TableHead>
                      <TableHead className="text-[#A0A0A0]">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map(
                      ([id, sub]: [bigint, ContactSubmission], i: number) => (
                        <TableRow
                          key={id.toString()}
                          className="border-white/5 hover:bg-white/5"
                          data-ocid={`admin.row.${i + 1}`}
                        >
                          <TableCell className="text-[#A0A0A0] text-sm">
                            {i + 1}
                          </TableCell>
                          <TableCell className="font-medium text-white">
                            {sub.name}
                          </TableCell>
                          <TableCell className="text-[#A0A0A0]">
                            {sub.email}
                          </TableCell>
                          <TableCell className="text-[#A0A0A0]">
                            {sub.phone}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="truncate text-sm text-[#A0A0A0]">
                              {sub.message}
                            </p>
                          </TableCell>
                          <TableCell className="text-[#A0A0A0] text-sm whitespace-nowrap">
                            {formatDate(sub.timestamp)}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
