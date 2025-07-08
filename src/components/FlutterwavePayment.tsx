
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FlutterwavePaymentProps {
  amount: number;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  title?: string;
  description?: string;
  onSuccess?: (data: any) => void;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

const FlutterwavePayment: React.FC<FlutterwavePaymentProps> = ({
  amount,
  customerEmail,
  customerName,
  customerPhone = "",
  title = "HajjAmbassador Payment",
  description = "Payment for services",
  onSuccess,
  onClose,
  className,
  children
}) => {
  React.useEffect(() => {
    // Load Flutterwave script if not already loaded
    if (!window.FlutterwaveCheckout) {
      const script = document.createElement('script');
      script.src = 'https://checkout.flutterwave.com/v3.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const handlePayment = () => {
    if (!window.FlutterwaveCheckout) {
      toast.error("Payment system not loaded. Please refresh and try again.");
      return;
    }

    window.FlutterwaveCheckout({
      public_key: "FLWPUBK-3d0e062fa50b5b538affc64535245178-X",
      tx_ref: "tx_" + Date.now(),
      amount: amount,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: customerEmail,
        phone_number: customerPhone,
        name: customerName,
      },
      callback: function (data: any) {
        console.log("Payment complete", data);
        if (data.status === "successful") {
          toast.success("Payment successful!");
          onSuccess?.(data);
        } else {
          toast.error("Payment failed or was cancelled");
        }
      },
      onclose: function () {
        console.log("Payment cancelled");
        onClose?.();
      },
      customizations: {
        title: title,
        description: description,
        logo: "https://your-logo-url.com/logo.png"
      },
    });
  };

  return (
    <Button onClick={handlePayment} className={className}>
      {children || `Pay ₦${amount.toLocaleString()}`}
    </Button>
  );
};

export default FlutterwavePayment;
