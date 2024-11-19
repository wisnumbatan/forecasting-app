import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/use-project";

const projectSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  settings: z.object({
    forecastMethod: z.enum(["ARIMA", "SARIMA", "Prophet"]),
    confidenceInterval: z.number().min(80).max(99)
  })
});

export function ProjectForm() {
  const { create: createProject } = useProjects();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(projectSchema)
  });

  const onSubmit = async (data: any) => {
    await createProject(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label>Project Name</label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <label>Description</label>
        <Textarea {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500">
            {errors.description.message as string}
          </p>
        )}
      </div>

      <Button type="submit">Create Project</Button>
    </form>
  );
}