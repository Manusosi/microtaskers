
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface ActivityData {
  date: string;
  clicks: number;
  earnings: number;
}

interface ActivityTableProps {
  activityData: ActivityData[];
}

export const ActivityTable = ({ activityData }: ActivityTableProps) => (
  <Card>
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Last 7 days activity</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Earning</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityData.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{71398658 + index}</TableCell>
                <TableCell>{activity.clicks}</TableCell>
                <TableCell>${activity.earnings.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${(activity.clicks / 15) * 100}%` }}
                    ></div>
                  </div>
                </TableCell>
                <TableCell>{activity.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);
