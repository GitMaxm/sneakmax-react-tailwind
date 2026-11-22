import { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleItem(item.id)}
            className="flex w-full cursor-pointer items-center
              justify-between text-left text-lg font-semibold
              transition-colors hover:text-[#514996]"
            aria-expanded={openItemId === item.id}
          >
            <span className="mg:text-base text-xl font-medium">
              {item.title}
            </span>
            <div className="relative h-7 w-7">
              <div
                className="absolute top-1/2 left-0 h-0.5 w-full
                  -translate-y-1/2 transform bg-current"
              ></div>
              <div
                className={`absolute top-1/2 left-0 h-0.5 w-full
                -translate-y-1/2 transform bg-current
                transition-transform duration-200 ${
                  openItemId === item.id ? 'rotate-90' : 'rotate-0'
                }`}
              ></div>
            </div>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300
            ease-in-out ${
              openItemId === item.id
                ? 'mt-3 max-h-96 opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-gray-400">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
