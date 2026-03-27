"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import Navbar from "../components/ui/navbar";
import Sidebar from "../components/ui/sidebar";
import { Admin } from "../components/admin";
import { Access } from "../components/Access/accesslevel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSearchParams } from "next/navigation";
import { currentUserThunk } from "../features/user/userSlice";
import type { LeadRecord } from "@/types/types";

type SidebarSection =
  | "leads"
  | "master"
  | "rate-quotation"
  | "booking-trip"
  | "payment"
  | "feedback"
  | "dashboard"
  | "access"
  | "admin";

type MasterKey =
  | "vendor"
  | "vehicles"
  | "vehicle-category"
  | "vehicle-registration"
  | "vehicle-add"
  | "driver"
  | "employee"
  | "hr"
  | "city"
  | "corporate-form"
  | "corporate-event"
  | "customer-personal"
  | "rate-quotation"
  | "card-reel"
  | "quotation-pdf"
  | "country-code"
  | "access-level"
  | "region"
  | "zone";

type LeadView =
  | "dashboard"
  | "lead-form"
  | "lead-table"
  | "sale-lead-table"
  | "sales-edit-form"
  | "tl-tables";

type DashboardView =
  | "leads-dashboard"
  | "presales-dashboard"
  | "citymanager-dashboard"
  | "bdm-dashboard"
  | "teamleader-dashboard"
  | "salesteam-dashboard";

interface MasterTab {
  key: MasterKey;
  label: string;
  component: ComponentType;
}

const LoadingPanel = () => (
  <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
    Loading module…
  </div>
);

const LeadsOverviewModule = dynamic(
  () => import("../components/pages/leads/dashboard"),
  {
    ssr: false,
    loading: LoadingPanel,
  },
);
const PresalesDashboardModule = dynamic(
  () => import("../components/presalesteam/dashboardpresales"),
  {
    ssr: false,
    loading: LoadingPanel,
  },
);



const BdmDashboardModule = dynamic(
  () => import("../components/bdmdash/bdmtemadash"),
  {
    ssr: false,
    loading: LoadingPanel,
  },
);



const masterTabs: MasterTab[] = [
 
  {
    key: "city",
    label: "City Master",
    component: dynamic(() => import("../components/Access/city"), {
      ssr: false,
      loading: LoadingPanel,
    }),
  },
  
  {
    key: "zone",
    label: "Zone",
    component: dynamic(() => import("../components/Access/zone"), {
      ssr: false,
      loading: LoadingPanel,
    }),
  },
  {
    key: "region",
    label: "Region",
    component: dynamic(() => import("../components/Access/region"), {
      ssr: false,
      loading: LoadingPanel,
    }),
  },
];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<SidebarSection>("leads");
  const [activeMaster, setActiveMaster] = useState<MasterKey>("vendor");
  const [activeLeadView, setActiveLeadView] = useState<LeadView>("dashboard");

  const getDefaultDashboard = (role: string): DashboardView => {
    const normalizedRole = role.toLowerCase().trim();
    switch (normalizedRole) {
      case "presales":
      case "presale":
        return "presales-dashboard";
      case "bdm":
        return "bdm-dashboard";
      case "sales":
        return "salesteam-dashboard";
      case "city manager":
      case "citymanager":
        return "citymanager-dashboard";
      case "team leader":
      case "teamleader":
      case "team_leader":
        return "teamleader-dashboard";
      default:
        return "leads-dashboard";
    }
  };

  const [activeDashboardView, setActiveDashboardView] =
    useState<DashboardView>("leads-dashboard");
  const [pendingModuleKey, setPendingModuleKey] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [activeYearKey, setActiveYearKey] = useState<string | null>(null);
  const [activeAccessKey, setActiveAccessKey] = useState<string | null>(null);
  const [showTransferLeads, setShowTransferLeads] = useState<boolean>(false);
  const [showSwapLeads, setShowSwapLeads] = useState<boolean>(false);
  const [showEnquiryTime, setShowTimeEnquiry] = useState<boolean>(false);
  const [showMlReports, setShowMlReports] = useState<boolean>(false);
  const [showMeReports, setShowMeReports] = useState<boolean>(false);
  const [showMonthlyEnquiry, setShowMonthlyEnquiry] = useState<boolean>(false);
  const [showEmpReport, setShowEmpReport] = useState<boolean>(false);
  const [showAeReports, setShowAeReports] = useState<boolean>(false);
  const [showAnulReports, setShowAnulReports] = useState<boolean>(false);
  const [showShortCut, setShortcutReports] = useState<boolean>(false);
  const [showRules, setRulesReports] = useState<boolean>(false);
  const [showLostRule, setLostLeadReports] = useState<boolean>(false);
  const [showUnwanted, setshowUnwanted] = useState<boolean>(false);

  const [showAnulDestReports, setShowAnulDestReports] =
    useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedLeadForEdit, setSelectedLeadForEdit] =
    useState<LeadRecord | null>(null);
  const [selectedLeadForRateQuotation, setSelectedLeadForRateQuotation] =
    useState<LeadRecord | null>(null);

  const resetAllReportStates = () => {
    setShowTransferLeads(false);
    setShowSwapLeads(false);
    setShowMlReports(false);
    setShowMeReports(false);
    setShowMonthlyEnquiry(false);
    setShowEmpReport(false);
    setShowAeReports(false);
    setShowAnulReports(false);
    setShowAnulDestReports(false);
    setRulesReports(false);
    setShortcutReports(false);
    setShowTimeEnquiry(false);
    setshowUnwanted(false);
  };

  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(currentUserThunk());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      const role = currentUser.role || "user";
      setUserRole(role);
      setUserName(currentUser.name || "User");
      setUserEmail(currentUser.email || "");

      // Set the default dashboard view based on role
      const defaultDashboard = getDefaultDashboard(role);
      setActiveDashboardView(defaultDashboard);

      // If Sales or Presales role (case insensitive), also set the active section to dashboard
      const lowerRole = role.toLowerCase().trim();
      if (
        lowerRole === "sales" ||
        lowerRole === "presale" ||
        lowerRole === "presales" ||
        lowerRole === "team leader" ||
        lowerRole === "teamleader" ||
        lowerRole === "team_leader" ||
        lowerRole === "bdm" ||
        lowerRole === "city manager" ||
        lowerRole === "citymanager"
      ) {
        setActiveSection("dashboard");
        // Ensure presales users always get presales-dashboard view
        if (lowerRole === "presale" || lowerRole === "presales") {
          setActiveDashboardView("presales-dashboard");
        }
      }
    }
  }, [currentUser]);

  // Listen for lead selection events from LeadSaleTableModule
  useEffect(() => {
    const handleViewLead = (event: CustomEvent<LeadRecord>) => {
      const lead = event.detail;
      if (lead) {
        setSelectedLeadForEdit(lead);
        setActiveSection("leads");
        setActiveLeadView("sales-edit-form");
        resetAllReportStates();
      }
    };

    window.addEventListener("viewLead", handleViewLead as EventListener);
    return () => {
      window.removeEventListener("viewLead", handleViewLead as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleRateQuotation = (event: CustomEvent<{ lead: LeadRecord }>) => {
      const { lead } = event.detail;
      console.log("Rate quotation event received for lead:", lead);
      if (lead) {
        setSelectedLeadForRateQuotation(lead);
        setActiveSection("rate-quotation");
        setPendingModuleKey(null);
        resetAllReportStates();
      }
    };

    window.addEventListener(
      "rateQuotation",
      handleRateQuotation as EventListener,
    );
    return () => {
      window.removeEventListener(
        "rateQuotation",
        handleRateQuotation as EventListener,
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const permittedMasterTabs = useMemo(() => masterTabs, []);
  const permittedMasterKeys = useMemo(
    () => permittedMasterTabs.map((tab) => tab.key) as MasterKey[],
    [permittedMasterTabs],
  );

  useEffect(() => {
    if (!permittedMasterKeys.includes(activeMaster)) {
      const fallback = permittedMasterKeys[0] ?? "vendor";
      setActiveMaster(fallback);
    }
  }, [activeMaster, permittedMasterKeys]);

  useEffect(() => {
    if (activeSection !== "leads" && activeLeadView !== "dashboard") {
      setActiveLeadView("dashboard");
    }
  }, [activeSection, activeLeadView]);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSelectedCity("");
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleDashboardSelect = (key: string) => {
    setActiveDashboardView(key as DashboardView);
  };

  const handleYearSelect = (key: string) => {
    setActiveYearKey(key);
  };

  const handleAccessSelect = (key: string) => {
    setActiveAccessKey(key);
  };

  const handleTransferLeads = () => {
    resetAllReportStates();
    setShowTransferLeads(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleSwapLeads = () => {
    resetAllReportStates();
    setShowSwapLeads(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleTimeEnquiry = () => {
    resetAllReportStates();
    setShowTimeEnquiry(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleMlReports = () => {
    resetAllReportStates();
    setShowMlReports(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleMeReports = () => {
    resetAllReportStates();
    setShowMeReports(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleMonthlyEnquiry = () => {
    resetAllReportStates();
    setShowMonthlyEnquiry(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleEmpReport = () => {
    resetAllReportStates();
    setShowEmpReport(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleAeReports = () => {
    resetAllReportStates();
    setShowAeReports(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleAnulReports = () => {
    resetAllReportStates();
    setShowAnulReports(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleAnulDestReports = () => {
    resetAllReportStates();
    setShowAnulDestReports(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleRules = () => {
    resetAllReportStates();
    setRulesReports(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  const handleShortcut = () => {
    resetAllReportStates();
    setShortcutReports(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };
  const handleUnwantedLeads = () => {
    resetAllReportStates();
    setshowUnwanted(true);
    setActiveSection("leads");
    setActiveLeadView("dashboard");
  };

  // 🔥 Handler for Sales Lead Table
  const handleSalesLeadSelect = (key: string) => {
    if (key === "sales-lead-table" || key === "sale-lead-table") {
      setPendingModuleKey(null);
      setActiveSection("leads");
      setActiveLeadView("sale-lead-table");
      resetAllReportStates();
    }
  };

  // 🔥 Handler for TL Tables
  const handleTlTablesSelect = (key: string) => {
    if (key === "tl-tables") {
      setPendingModuleKey(null);
      setActiveSection("leads");
      setActiveLeadView("tl-tables");
      resetAllReportStates();
    }
  };

  const handleSalesEditFormSelect = (key: string) => {
    if (key === "sales-edit-form") {
      setPendingModuleKey(null);
      setActiveSection("leads");
      setActiveLeadView("sales-edit-form");
      resetAllReportStates();
    }
  };

  const ActiveMasterComponent = useMemo(() => {
    if (activeSection !== "master") {
      return null;
    }
    return (
      permittedMasterTabs.find((tab) => tab.key === activeMaster)?.component ??
      null
    );
  }, [activeMaster, activeSection, permittedMasterTabs]);

  const renderFallback = (title: string, description: string) => (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 text-center">
      <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
      <p className="max-w-xl mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );

  const mainContent = (() => {
    if (activeSection === "master") {
      if (pendingModuleKey) {
        return renderFallback(
          "Module coming soon",
          `The ${pendingModuleKey.replace(/-/g, " ")} module is not ready yet.`,
        );
      }
      if (ActiveMasterComponent) {
        return (
          <div className="space-y-6">
            <ActiveMasterComponent />
          </div>
        );
      }
      return renderFallback(
        "Module not found",
        "Select a different master module while we locate this one.",
      );
    }

    if (activeSection === "leads") {
      if (showTransferLeads) {
        const TransferLeadsModule = dynamic(
          () => import("../components/pages/leads/Reports/transferleads"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <TransferLeadsModule />
          </div>
        );
      }
      if (showSwapLeads) {
        const SwapLeadsModule = dynamic(
          () => import("../components/pages/teamleader/swapleads"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <SwapLeadsModule />
          </div>
        );
      }
      if (showEnquiryTime) {
        const SwapLeadsModule = dynamic(
          () => import("../components/pages/leads/Reports/timenuiry"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <SwapLeadsModule />
          </div>
        );
      }

      if (showMlReports) {
        const MlReportsModule = dynamic(
          () => import("../components/pages/leads/Reports/mlreport"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <MlReportsModule />
          </div>
        );
      }
      if (showMeReports) {
        const MeReportsModule = dynamic(
          () => import("../components/pages/leads/Reports/mereport"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <MeReportsModule />
          </div>
        );
      }

      if (showMonthlyEnquiry) {
        const MonthlyEnquiryModule = dynamic(
          () => import("../components/pages/leads/Reports/monthlyenquiry"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <MonthlyEnquiryModule />
          </div>
        );
      }

      if (showEmpReport) {
        const EmpReportModule = dynamic(
          () => import("../components/pages/leads/Reports/empreport"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <EmpReportModule />
          </div>
        );
      }

      if (showAeReports) {
        const AeReportModule = dynamic(
          () => import("../components/pages/leads/Reports/annualreport"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <AeReportModule />
          </div>
        );
      }

      if (showAnulReports) {
        const AnulReportModule = dynamic(
          () => import("../components/pages/leads/Reports/anulreport"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <AnulReportModule />
          </div>
        );
      }

      if (showAnulDestReports) {
        const AnulDestReportModule = dynamic(
          () =>
            import("../components/pages/leads/Reports/anuldestinationreport"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <AnulDestReportModule />
          </div>
        );
      }

      if (showShortCut) {
        const ShortcutReportModule = dynamic(
          () => import("../components/pages/leads/Reports/shortcuttable"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <ShortcutReportModule />
          </div>
        );
      }

      if (showRules) {
        const RulesReportModule = dynamic(
          () => import("../components/pages/leads/Reports/rules"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <RulesReportModule />
          </div>
        );
      }
      if (showUnwanted) {
        const UnwantedLeadsModule = dynamic(
          () =>
            import("../components/pages/leads/Reports/unwantedleadtables.tsx"),
          {
            ssr: false,
            loading: LoadingPanel,
          },
        );
        return (
          <div className="space-y-6">
            <UnwantedLeadsModule />
          </div>
        );
      }

      return (
        <div className="space-y-6">
          <LeadsOverviewModule />
        </div>
      );
    }

    if (activeSection === "admin") {
      return (
        <div className="space-y-6">
          <Admin />
        </div>
      );
    }

    if (activeSection === "dashboard") {
      if (activeDashboardView === "leads-dashboard") {
        return (
          <div className="space-y-6">
            <LeadsOverviewModule />
          </div>
        );
      }
      if (activeDashboardView === "presales-dashboard") {
        return (
          <div className="space-y-6">
            <PresalesDashboardModule />
          </div>
        );
      }
      if (activeDashboardView === "citymanager-dashboard") {
        return (
          <div className="space-y-6">
            <div>City Manager Dashboard Coming Soon</div>
          </div>
        );
      }
      if (activeDashboardView === "bdm-dashboard") {
        return (
          <div className="space-y-6">
            <BdmDashboardModule />
          </div>
        );
      }

      return (
        <div className="space-y-6">
          <LeadsOverviewModule />
        </div>
      );
    }

    if (activeSection === "access") {
      return (
        <div className="space-y-6">
          <Access activeAccessKey={activeAccessKey} />
        </div>
      );
    }

    return null;
  })();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 text-slate-900">
      {/* Navbar - Full Width */}
      <Navbar
        // 🔥 Added showSalesMenu prop
        showSalesMenu={true}
        showAccess={activeSection === "access"}
        showMaster={activeSection === "master"}
        showLeadsMenu={activeSection === "leads"}
        showYearMenu={activeSection === "leads"}
        activeSection={activeSection}
        activeMasterKey={activeMaster}
        activeLeadKey={activeLeadView === "dashboard" ? null : activeLeadView}
        activeDashboardKey={activeDashboardView}
        activeYearKey={activeYearKey}
        activeAccessKey={activeAccessKey}
        selectedRegion={selectedRegion}
        selectedCity={selectedCity}
        onRegionChange={handleRegionChange}
        onCityChange={handleCityChange}
        onDashboardSelect={handleDashboardSelect}
        onYearSelect={handleYearSelect}
        onAccessSelect={handleAccessSelect}
        onTransferLeads={handleTransferLeads}
        onSwapLeads={handleSwapLeads}
        onTimeEnquiry={handleTimeEnquiry}
        onMlReports={handleMlReports}
        onMeReports={handleMeReports}
        onMonthlyEnquiry={handleMonthlyEnquiry}
        onEmpreport={handleEmpReport}
        onAeReports={handleAeReports}
        onAnulReports={handleAnulReports}
        onAnulDestReports={handleAnulDestReports}
        onshortcuttable={handleShortcut}
        onrules={handleRules}
        onpresales={handleUnwantedLeads}
        // 🔥 Added onSalesLeadSelect prop
        onSalesLeadSelect={handleSalesLeadSelect}
        onSalesEditFormSelect={handleSalesEditFormSelect}
        onTlTablesSelect={handleTlTablesSelect}
        onMasterSelect={(key) => {
          const targeted = permittedMasterTabs.find((tab) => tab.key === key);
          setActiveSection("master");
          resetAllReportStates();
          if (targeted) {
            setPendingModuleKey(null);
            setActiveMaster(targeted.key);
            return;
          }
          setPendingModuleKey(key);
        }}
        onLeadSelect={(key) => {
          if (key === "lead-form" || key === "lead-table") {
            setPendingModuleKey(null);
            setActiveSection("leads");
            setActiveLeadView(key);
            resetAllReportStates();
          } else if (key === "sale-lead-table") {
            handleSalesLeadSelect(key);
          }
        }}
        permittedMasterKeys={permittedMasterKeys}
        userName={userName}
        roleLabel={userRole}
        userRole={userRole}
        onLogout={handleLogout}
      />

      {/* Sidebar + Main Content - Remaining Height */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeItem={activeSection}
          userRole={userRole}
          onAccessClick={() => {
            setActiveSection("access");
            setPendingModuleKey(null);
            resetAllReportStates();
          }}
          onAdminClick={() => {
            setActiveSection("admin");
            setPendingModuleKey(null);
            resetAllReportStates();
          }}
          onMasterClick={() => {
            setActiveSection("master");
            setPendingModuleKey(null);
            resetAllReportStates();
          }}
          onLeadsClick={() => {
            setActiveSection("leads");
            setPendingModuleKey(null);
            setActiveLeadView("dashboard");
            resetAllReportStates();
          }}
          onRateQuotationClick={() => {
            setActiveSection("rate-quotation");
            setPendingModuleKey(null);
            resetAllReportStates();
          }}
          onBookingTripClick={() => {
            setActiveSection("booking-trip");
            setPendingModuleKey(null);
            resetAllReportStates();
          }}
          onPaymentClick={() => {
            setActiveSection("payment");
            setPendingModuleKey(null);
            resetAllReportStates();
          }}
          onFeedbackClick={() => {
            setActiveSection("feedback");
            setPendingModuleKey(null);
            resetAllReportStates();
          }}
        />

        <main className="flex-1 px-4 py-1 overflow-y-auto bg-white sm:px-6">
          <div className="w-full mx-auto space-y-6">{mainContent}</div>
        </main>
      </div>
    </div>
  );
}
