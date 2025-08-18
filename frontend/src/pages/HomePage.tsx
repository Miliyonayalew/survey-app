import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center mb-6">
            Survey App
          </h1>
          
          <Link to="/survey/1" className="block w-full">
            <Button className="w-full" size="lg">
              View Surveys
            </Button>
          </Link>
          
          <Link to="/submission/1" className="block w-full">
            <Button className="w-full" variant="outline" size="lg">
              View Response
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
