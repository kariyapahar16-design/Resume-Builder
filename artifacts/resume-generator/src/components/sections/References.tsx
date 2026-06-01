import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ReferenceSchema, Reference } from "@/types/resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

const FormSchema = z.object({ items: z.array(ReferenceSchema) });

interface Props {
  data: Reference[];
  updateData: (data: Reference[]) => void;
}

export default function ReferencesSection({ data, updateData }: Props) {
  const form = useForm<{ items: Reference[] }>({
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
        updateData(value.items as Reference[]);
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
              <h4 className="font-medium text-sm text-sidebar-foreground/80">Reference #{index + 1}</h4>
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
                name={`items.${index}.availableOnRequest`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2 bg-muted/50 md:col-span-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Available upon request</FormLabel>
                      <p className="text-xs text-muted-foreground">If checked, details below will be hidden</p>
                    </div>
                  </FormItem>
                )}
              />

              {!form.watch(`items.${index}.availableOnRequest`) && (
                <>
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Engineering Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.phone`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="secondary" 
          className="w-full bg-primary/10 text-primary hover:bg-primary/20"
          onClick={() => append({ 
            id: crypto.randomUUID(), 
            name: "", 
            title: "", 
            company: "", 
            email: "", 
            phone: "", 
            availableOnRequest: false 
          })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Reference
        </Button>
      </form>
    </Form>
  );
}
