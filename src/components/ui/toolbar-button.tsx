import { cn } from "@/lib/utils";
import { TooltipContentProps } from "@radix-ui/react-tooltip";
import React, { forwardRef } from "react";
import { Toggle } from "./toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface ToolbarButtonProps
  extends React.ComponentPropsWithoutRef<typeof Toggle> {
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipContentProps;
}
const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  function ToolbarButton(
    { isActive, children, tooltip, className, tooltipOptions, ...props },
    ref
  ) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              {...props}
              ref={ref}
              className={cn(
                "rounded disabled:pointer-events-auto disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:bg-transparent data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                {
                  "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground":
                    isActive,
                },
                className
              )}
            >
              {children}
            </Toggle>
          </TooltipTrigger>
          {tooltip && (
            <TooltipContent {...tooltipOptions}>
              <div className="flex flex-col items-center text-center">
                {tooltip}
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }
);

ToolbarButton.displayName = "ToolbarButton";

export { ToolbarButton };
