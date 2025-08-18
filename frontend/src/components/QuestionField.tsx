import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/api";

interface QuestionProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onCheckboxChange: (value: string, checked: boolean) => void;
  error?: string;
  questionNumber: number;
}

// Question Input Components
const TextInput = ({ question, value, onChange }: QuestionProps) => (
  <Input
    type={question.type === "EMAIL" ? "email" : question.type === "NUMBER" ? "number" : "text"}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={`Enter your ${question.type.toLowerCase()}...`}
  />
);

const DateInput = ({ value, onChange }: QuestionProps) => {
  const [open, setOpen] = useState(false);
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, "yyyy-MM-dd"));
      setOpen(false); // Close popover after selection
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const SelectInput = ({ question, value, onChange }: QuestionProps) => {
  const options = question.options 
    ? question.options.split(',').map((opt: string) => opt.trim()).filter(Boolean) 
    : [];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: string, index: number) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const MultiSelectInput = ({ question, value, onCheckboxChange }: QuestionProps) => {
  const options = question.options 
    ? question.options.split(',').map((opt: string) => opt.trim()).filter(Boolean) 
    : [];

  return (
    <div className="space-y-2">
      {options.map((option: string, index: number) => (
        <div key={index} className="flex items-center space-x-2">
          <Checkbox
            id={`${question.id}-${index}`}
            checked={value.includes(option)}
            onCheckedChange={(checked) => onCheckboxChange(option, checked as boolean)}
          />
          <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
        </div>
      ))}
    </div>
  );
};

// Main QuestionField Component
export const QuestionField = ({ 
  question, 
  value, 
  onChange, 
  onCheckboxChange, 
  error, 
  questionNumber 
}: QuestionProps) => {
  const renderInput = () => {
    switch (question.type) {
      case "TEXT":
      case "EMAIL":
      case "NUMBER":
        return <TextInput question={question} value={value} onChange={onChange} onCheckboxChange={onCheckboxChange} questionNumber={questionNumber} />;
      case "DATE":
        return <DateInput question={question} value={value} onChange={onChange} onCheckboxChange={onCheckboxChange} questionNumber={questionNumber} />;
      case "SELECT":
        return <SelectInput question={question} value={value} onChange={onChange} onCheckboxChange={onCheckboxChange} questionNumber={questionNumber} />;
      case "MULTISELECT":
        return <MultiSelectInput question={question} value={value} onChange={onChange} onCheckboxChange={onCheckboxChange} questionNumber={questionNumber} />;
      default:
        return <TextInput question={question} value={value} onChange={onChange} onCheckboxChange={onCheckboxChange} questionNumber={questionNumber} />;
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm sm:text-base font-medium">
        {questionNumber}. {question.text}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-xs sm:text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
