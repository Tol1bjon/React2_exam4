import { CheckCircle2, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface CheckProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Check({ isOpen, onClose }: CheckProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4" role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <section role="dialog" aria-modal="true" aria-labelledby="purchase-success-title" className="relative w-full max-w-105 rounded-lg bg-white px-6 py-8 text-center shadow-xl sm:px-10">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-black">
          <X className="size-5" />
        </button>
        <CheckCircle2 className="mx-auto mb-4 size-14 text-[#DB4444]" />
        <h2 id="purchase-success-title" className="mb-2 text-xl font-semibold text-black">
          Спасибо за покупку!
        </h2>
        <p className="mb-6 text-sm text-neutral-500">
          Ваш заказ успешно оформлен.
        </p>
        <NavLink to={'/'}>
            <button type="button" onClick={onClose} className="rounded-sm bg-[#DB4444] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c93b3b]">
              Домой
            </button>
        </NavLink>
      </section>
    </div>
  );
}
