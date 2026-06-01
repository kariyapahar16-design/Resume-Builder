import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LanguageSchema, Language } from "@/types/resume";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

const FormSchema = z.object({ items: z.array(LanguageSchema) });

interface Props {
  data: Language[];
  updateData: (data: Language[]) => void;
}

export default function LanguagesSection({ data, updateData }: Props) {
  const form = useForm<{ items: Language[] }>({
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
        updateData(value.items as Language[]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2 p-3 border border-sidebar-border rounded-lg bg-sidebar/30">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name={`items.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Language (e.g. Spanish)" className="h-9" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.proficiency`}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Proficiency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Native">Native</SelectItem>
                        <SelectItem value="Fluent">Fluent</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Basic">Basic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button 
          type="button" 
          variant="secondary" 
          size="sm"
          className="w-full bg-primary/10 text-primary hover:bg-primary/20"
          onClick={() => append({ 
            id: crypto.randomUUID(), 
            name: "", 
            proficiency: "Fluent" 
          })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Language
        </Button>
      </form>
    </Form>
  );
}
