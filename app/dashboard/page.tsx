"use client";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Printer,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationControls } from "./_components/PaginationControls";
import { CalendarCard } from "./_components/CalendarCard";
import { toast } from "sonner";
import { useRef } from "react";

const data = [
  {
    id: 1,
    first_name: "Jacquenetta",
    email: "jaston0@flickr.com",
    phone: "590-122-8197",
    address: "90 John Wall Pass",
  },
  {
    id: 2,
    first_name: "Myrtia",
    email: "mcanedo1@twitter.com",
    phone: "401-138-0223",
    address: "81 Armistice Avenue",
  },
  {
    id: 3,
    first_name: "Lanette",
    email: "lbuzin2@purevolume.com",
    phone: "871-517-4762",
    address: "3642 Alpine Hill",
  },
  {
    id: 4,
    first_name: "Mandi",
    email: "mclayton3@home.pl",
    phone: "180-978-2739",
    address: "2 Brentwood Place",
  },
  {
    id: 5,
    first_name: "Aveline",
    email: "aaltamirano4@ihg.com",
    phone: "388-395-5028",
    address: "6829 Grim Point",
  },
  {
    id: 6,
    first_name: "Jemmy",
    email: "jbarenski5@amazon.co.jp",
    phone: "731-738-1274",
    address: "6 Quincy Terrace",
  },
  {
    id: 7,
    first_name: "Merwin",
    email: "mdunklee6@wisc.edu",
    phone: "585-158-7356",
    address: "6 American Ash Lane",
  },
  {
    id: 8,
    first_name: "Janet",
    email: "jjerred7@vk.com",
    phone: "859-778-5634",
    address: "09 4th Avenue",
  },
  {
    id: 9,
    first_name: "Torrance",
    email: "tmoden8@nsw.gov.au",
    phone: "198-697-0676",
    address: "8235 Fairview Street",
  },
  {
    id: 10,
    first_name: "Aryn",
    email: "adyers9@phpbb.com",
    phone: "283-144-9033",
    address: "5 Bonner Crossing",
  },
  {
    id: 11,
    first_name: "Tess",
    email: "tmoraleea@spiegel.de",
    phone: "219-565-1770",
    address: "700 Red Cloud Lane",
  },
  {
    id: 12,
    first_name: "Janeczka",
    email: "jtomalab@ted.com",
    phone: "443-418-1381",
    address: "0 Acker Circle",
  },
  {
    id: 13,
    first_name: "Morty",
    email: "mmoarc@nymag.com",
    phone: "399-631-4804",
    address: "6 Green Ridge Way",
  },
  {
    id: 14,
    first_name: "Gus",
    email: "gshawyersd@github.io",
    phone: "491-349-7984",
    address: "8983 Katie Park",
  },
  {
    id: 15,
    first_name: "Teodor",
    email: "tedwickere@ibm.com",
    phone: "499-692-8518",
    address: "898 Algoma Place",
  },
  {
    id: 16,
    first_name: "Pauli",
    email: "pslopierf@usnews.com",
    phone: "467-886-5987",
    address: "0 Westridge Drive",
  },
  {
    id: 17,
    first_name: "Jonah",
    email: "jfrancescozzig@umich.edu",
    phone: "746-550-2593",
    address: "47 Village Green Hill",
  },
  {
    id: 18,
    first_name: "Vicky",
    email: "vmatevosianh@auda.org.au",
    phone: "305-119-2114",
    address: "9128 Petterle Junction",
  },
  {
    id: 19,
    first_name: "Tulley",
    email: "theinritzi@earthlink.net",
    phone: "175-560-8558",
    address: "13141 Farwell Trail",
  },
  {
    id: 20,
    first_name: "Helen",
    email: "hhryncewiczj@deliciousdays.com",
    phone: "116-399-4463",
    address: "5 Forster Junction",
  },
];

export default function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const paginatedData = data.slice(start, end);
  const showToast = () => {
    toast.success("Event has been created.");
  };
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;
    console.log(printContents);
    if (printContents) {
      const printWindow = window.open("", "", "height=500,width=800");
      if (printWindow) {
        printWindow.document.write("<html><head><title>Print</title>");
        const linkElement = printWindow.document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
        linkElement.onload = () => {
          printWindow.document.write('</head><body>');
          printWindow.document.write(printContents);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.print();
        };
        printWindow.document.head.appendChild(linkElement);
      }
    }
  };
  return (
    <div>
      <title>Dashboard</title>
      <main className="flex flex-1 flex-col gap-4 px-4 md:gap-8 md:px-8">
        <h1 className="text-[32px] font-bold">Home</h1>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">---</div>
              <p className="text-xs text-muted-foreground">
                --- from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">---</div>
              <p className="text-xs text-muted-foreground">
                --- from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">---</div>
              <p className="text-xs text-muted-foreground">
                --- since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div
          className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3"
        >
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4" ref={printRef}>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <div className="ml-auto">
                <Button
                  variant="expandIcon"
                  Icon={Printer}
                  iconPlacement="right"
                  className="ml-auto"
                  onClick={() => handlePrint()}
                >
                  Print
                </Button>
                <Button
                  variant="expandIcon"
                  Icon={ArrowUpRight}
                  iconPlacement="right"
                  className="ml-3"
                  onClick={() => showToast()}
                >
                  View All
                </Button>
              </div>
              
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item) => (
                    <TableRow key={item.first_name}>
                      <TableCell>
                        <div className="font-medium">{item.first_name}</div>
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            {/* <PaginationControls
              totalData={data.length}
              hasNext={end < data.length}
              customPerPage={5}
              hasPrev={start > 0}
            /> */}
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <CalendarCard />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
