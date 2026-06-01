import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VolunteerWorkSchema, VolunteerWork } from "@/types/resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

const FormSchema = z.object({ items: z.array(VolunteerWorkSchema) });

interface Props {
  data: VolunteerWork[];
  updateData: (data: VolunteerWork[]) => void;
}

export default function VolunteerWorkSection({ data, updateData }: Props) {
  const form = useForm<{ items: VolunteerWork[] }>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: data },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.items) {
        updateData(value.items as VolunteerWork[]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-sidebar-border rounded-lg bg-sidebar/50 relative space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm text-sidebar-foreground/80">Volunteer Work #{index + 1}</h4>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`items.${index}.organization`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Red Cross" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Volunteer Coordinator" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.dates`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Dates</FormLabel>
                    <FormControl>
                      <Input placeholder="2019 - Present" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.description`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Organized local blood drives and trained new volunteers..." 
                        className="resize-y"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="secondary" 
          className="w-full bg-primary/10 text-primary hover:bg-primary/20"
          onClick={() => append({ 
            id: crypto.randomUUID(), 
            organization: "", 
            role: "", 
            dates: "", 
            description: "" 
          })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Volunteer Work
        </Button>
      </form>
    </Form>
  );
}
