import React from "react";
import { Button } from "./Button";
import { Download, Star } from "lucide-react";

interface DownloadOptionProps {
    title: string;
    premium?: boolean;
}

const DownloadOption = ({ title, premium = false }: DownloadOptionProps) => {
    return (
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl ">

            <div className="text-base font-medium text-foreground flex items-center gap-3">
                {!premium ? <Download className="w-5 h-5 text-white" /> : <Star className="w-5 h-5 text-primary" />}
                <span>{title}</span>
            </div>

            <div className="relative flex flex-col items-center">
                <Button className="w-full sm:w-auto flex items-center gap-2 justify-center">
                    <Download className="w-4 h-4" />
                    Download
                </Button>
            </div>
        </div>
    );
};

export default DownloadOption;
