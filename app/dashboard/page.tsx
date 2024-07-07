"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useInvoices } from "../hooks/useInvoices";
import { formatCurrency } from "@/lib/helper";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RawInvoiceData {
  customers: {
    name: string;
  };
  status: "paid" | "unpaid";
  created_at: string;
  paid_at: string | null;
  shipping_fees: number;
  tax_charges: number;
  sub_total: number;
  grand_total: number;
}

interface InvoiceData {
  Customer: string;
  Status: "paid" | "unpaid";
  Date: string;
  Paid_date: string;
  Shipping_fees: number;
  Tax_charges: number;
  Sub_total: number;
  Grand_total: number;
}

interface MonthlyChartData {
  date: string;
  "Grand Total": number;
  "Sub Total": number;
  "Tax Charges": number;
  "Shipping Fees": number;
  "Invoice Count": number;
}

const InvoiceAnalysisDashboard: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("All");
  const { invoices, getInvoices } = useInvoices();

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);
  const data: InvoiceData[] = useMemo(() => {
    return (
      invoices?.map((item: RawInvoiceData) => ({
        Customer: item.customers.name,
        Status: item.status,
        Date: dayjs(item.created_at).format("YYYY-MM-DD"),
        Paid_date: item.paid_at
          ? dayjs(item.paid_at).format("YYYY-MM-DD")
          : "N/A",
        Shipping_fees: item.shipping_fees,
        Tax_charges: item.tax_charges,
        Sub_total: item.sub_total,
        Grand_total: item.grand_total,
      })) || []
    );
  }, [invoices]);

  const customers = useMemo(() => {
    const uniqueCustomers = Array.from(
      new Set(data.map((item) => item.Customer))
    );
    return ["All", ...uniqueCustomers];
  }, [data]);

  const filteredData = useMemo(() => {
    return selectedCustomer === "All"
      ? data
      : data.filter((item) => item.Customer === selectedCustomer);
  }, [selectedCustomer, data]);

  const totalRevenue = useMemo(
    () =>
      filteredData.reduce((sum, item) => sum + item.Grand_total, 0).toFixed(2),
    [filteredData]
  );
  const averageOrderValue = useMemo(
    () =>
      filteredData.length > 0
        ? (parseFloat(totalRevenue) / filteredData.length).toFixed(2)
        : "0.00",
    [filteredData, totalRevenue]
  );
  const paidInvoices = useMemo(
    () => filteredData.filter((item) => item.Status === "paid").length,
    [filteredData]
  );
  const unpaidInvoices = useMemo(
    () => filteredData.filter((item) => item.Status === "unpaid").length,
    [filteredData]
  );

  const chartData: MonthlyChartData[] = useMemo(() => {
    const monthlyData: { [key: string]: MonthlyChartData } = {};

    filteredData.forEach((item) => {
      const monthYear = dayjs(item.Date).format("YYYY-MM");
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          date: monthYear,
          "Grand Total": 0,
          "Sub Total": 0,
          "Tax Charges": 0,
          "Shipping Fees": 0,
          "Invoice Count": 0,
        };
      }
      monthlyData[monthYear]["Grand Total"] += item.Grand_total;
      monthlyData[monthYear]["Sub Total"] += item.Sub_total;
      monthlyData[monthYear]["Tax Charges"] += item.Tax_charges;
      monthlyData[monthYear]["Shipping Fees"] += item.Shipping_fees;
      monthlyData[monthYear]["Invoice Count"]++;
    });
    // Round all numeric values to 2 decimal places
    Object.values(monthlyData).forEach((data) => {
      data["Grand Total"] = Number(data["Grand Total"].toFixed(2));
      data["Sub Total"] = Number(data["Sub Total"].toFixed(2));
      data["Tax Charges"] = Number(data["Tax Charges"].toFixed(2));
      data["Shipping Fees"] = Number(data["Shipping Fees"].toFixed(2));
    });
    return Object.values(monthlyData).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, [filteredData]);

  if (!invoices) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Analysis Dashboard</h1>

      <div className="mb-4">
        <Label htmlFor="type" className="text-right">
          Select Customer
        </Label>

        <Select
          onValueChange={setSelectedCustomer}
          value={selectedCustomer}
          
        >
          <SelectTrigger className="w-[400px]">
            <SelectValue placeholder="Customer" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Customer</SelectLabel>
              {customers.map((customer) => (
                <SelectItem
                  key={customer}
                  value={customer}
                  className="capitalize"
                >
                  {customer}
                </SelectItem>
              ))}

              <SelectItem value="business" className="capitalize">
                Business
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <MetricCard title="Total Revenue" value={`$${totalRevenue}`} />
        <MetricCard
          title="Average Order Value"
          value={`$${averageOrderValue}`}
        />
        <MetricCard title="Paid Invoices" value={paidInvoices.toString()} />
        <MetricCard title="Unpaid Invoices" value={unpaidInvoices.toString()} />
      </div>

      <div className="bg-platinum p-4 rounded shadow mb-4">
        <h2 className="text-lg text-darknight font-semibold mb-2">
          Monthly Invoice Breakdown
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="Grand Total" fill="#8884d8" />
              <Bar yAxisId="left" dataKey="Sub Total" fill="#82ca9d" />
              <Bar yAxisId="left" dataKey="Tax Charges" fill="#ffc658" />
              <Bar yAxisId="left" dataKey="Shipping Fees" fill="#ff7300" />
              <Bar yAxisId="right" dataKey="Invoice Count" fill="#413ea0" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-platinum text-darknight p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Invoice Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-platinum">
            <thead>
              <tr className="bg-onyx text-cloud uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Paid Date</th>
                <th className="py-3 px-6 text-right">Shipping Fees</th>
                <th className="py-3 px-6 text-right">Tax Charges</th>
                <th className="py-3 px-6 text-right">Sub Total</th>
                <th className="py-3 px-6 text-right">Grand Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.Customer}
                  </td>
                  <td className="py-3 px-6 text-left">{item.Status}</td>
                  <td className="py-3 px-6 text-left">{item.Date}</td>
                  <td className="py-3 px-6 text-left">{item.Paid_date}</td>
                  <td className="py-3 px-6 text-right">
                    {formatCurrency(item.Shipping_fees)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {formatCurrency(item.Tax_charges)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {formatCurrency(item.Sub_total)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {formatCurrency(item.Grand_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => (
  <div className="bg-platinum text-darknight p-4 rounded shadow">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default InvoiceAnalysisDashboard;
