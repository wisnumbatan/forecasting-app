import { Toast } from "@/components/ui/toast";

export const useToast = () => {
  return {
    toasts: [] as any[],
    addToast: (props: any) => {
      const newToast = {
        ...props,
        duration: props.duration || 5000
      };
      Toast(newToast);
      useToast().toasts.push(newToast);
    }
  };
};