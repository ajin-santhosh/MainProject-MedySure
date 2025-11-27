import React from 'react'
import {
  ChartNoAxesCombined
} from "lucide-react";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";

function DataCards({data}) {
  function AnimatedNumber({ target, duration = 800 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{value}</span>;
}
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ">
      <Card className="@container/card dark:bg-gray-950">
        <CardHeader>
          <CardDescription>{data.cardH}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
           <AnimatedNumber target={data.total_count} />
          </CardTitle>
          
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.th2} < ChartNoAxesCombined className="size-4" />
          </div>
            {/* <div className="text-muted-foreground">
              {data.th3}
            </div> */}
           
        </CardFooter>
        
      </Card>
       
    
    </div>

  )
}

export default DataCards