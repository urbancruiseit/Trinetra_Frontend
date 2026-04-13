import axiosInstance from "@/uitils/axiosInstance";

export interface CustomerRecord {
  id?: number;
  uuid?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  customerName?: string;
  customerPhone: string;
  customerEmail?: string;
  companyName?: string;
  customerType?: string;
  customerCategoryType?: string;
  alternatePhone?: string;
  countryName?: string;
  customerCity?: string;
  customerState?: string;
  address?: string;
  date_of_birth?: string;
  anniversary?: string;
  gender?: string;
  state?: string;
  pincode?: string;
  city?: string;
  cityId?: number;
  stateId?: number;
}

// ─── FIELD MAPPER ─────────────────────────
const mapFormToBackend = (
  formData: Partial<CustomerRecord> & {
    phone?: string;
    email?: string;
    dateOfBirth?: string;
  },
): Partial<CustomerRecord> => ({
  firstName: formData.firstName || undefined,
  middleName: formData.middleName || undefined,
  lastName: formData.lastName || undefined,
  customerPhone: formData.customerPhone || formData.phone!,
  customerEmail: formData.customerEmail || formData.email || undefined,
  alternatePhone: formData.alternatePhone || undefined,
  date_of_birth: formData.date_of_birth || formData.dateOfBirth || undefined,
  anniversary: formData.anniversary || undefined,
  gender: formData.gender || undefined,
  address: formData.address || undefined,
  state: formData.state || undefined,
  city: formData.city || undefined,
  pincode: formData.pincode || undefined,
  stateId: formData.stateId ?? undefined,
  cityId: formData.cityId ?? undefined,
  companyName: formData.companyName || undefined,
  customerType: formData.customerType || undefined,
  customerCategoryType: formData.customerCategoryType || undefined,
  countryName: formData.countryName || undefined,
  customerCity: formData.customerCity || undefined,
  customerState: formData.customerState || undefined,
});

// ─── FETCH ALL CUSTOMERS ───────────────────
export const fetchCustomersAPI = async (): Promise<CustomerRecord[]> => {
  try {
    const { data: res } = await axiosInstance.get("/newcustomer");

    return res?.data?.customers || [];
  } catch (error: any) {
    console.error(
      "Error fetching customers:",
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || "Error fetching customers",
    );
  }
};

// ─── SEARCH CUSTOMERS ──────────────────────
export const searchCustomersAPI = async (
  searchTerm: string,
): Promise<CustomerRecord[]> => {
  try {
    const { data: res } = await axiosInstance.get("/newcustomer/search", {
      params: { search: searchTerm },
    });

    return (
      res?.data?.customers ||
      res?.customers ||
      (Array.isArray(res) ? res : []) ||
      []
    );
  } catch (error: any) {
    console.error(
      "Error searching customers:",
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || "Error searching customers",
    );
  }
};

// ─── CREATE CUSTOMER ───────────────────────
export const createCustomerAPI = async (
  formData: Partial<CustomerRecord> & { phone?: string; email?: string },
): Promise<CustomerRecord> => {
  try {
    const payload = mapFormToBackend(formData);

    const { data: res } = await axiosInstance.post("/newcustomer", payload);

    return res?.data?.customer || res?.data;
  } catch (error: any) {
    console.error(
      "Error creating customer:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Error creating customer");
  }
};

// ─── UPDATE CUSTOMER ───────────────────────
export const updateCustomerAPI = async (
  id: number,
  formData: Partial<CustomerRecord> & {
    phone?: string;
    email?: string;
    dateOfBirth?: string;
  },
): Promise<CustomerRecord> => {
  try {
    const payload = mapFormToBackend(formData);

    const { data: res } = await axiosInstance.put(
      `/newcustomer/${id}`,
      payload,
    );

    if (res?.data?.customer) return res.data.customer;
    if (res?.data) return res.data;

    // fallback (backend null bhej raha ho)
    return { ...payload, id, customerPhone: payload.customerPhone! };
  } catch (error: any) {
    console.error(
      "Error updating customer:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Error updating customer");
  }
};
