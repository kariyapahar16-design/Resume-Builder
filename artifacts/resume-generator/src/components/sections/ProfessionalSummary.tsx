import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfessionalSummarySchema, ProfessionalSummary } from "@/types/resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

interface Props {
  data: ProfessionalSummary;
  updateData: (data: Partial<ProfessionalSummary>) => void;
}

export default function ProfessionalSummarySection({ data, updateData }: Props) {
  const form = useForm<ProfessionalSummary>({
    resolver: zodResolver(ProfessionalSummarySchema),
    defaultValues: data,
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateData(value as Partial<ProfessionalSummary>);
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Summary</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Experienced software engineer with a passion for building scalable web applications..." 
                  className="min-h-[150px] resize-y"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
