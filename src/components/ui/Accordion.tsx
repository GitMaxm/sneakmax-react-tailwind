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
                        className="flex justify-between items-center w-full text-left font-semibold text-lg hover:text-[#514996] transition-colors cursor-pointer"
                        aria-expanded={openItemId === item.id}
                    >
                        <span className='mg:text-base text-xl font-medium'>{item.title}</span>
                        <div className="relative w-7 h-7">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2"></div>
                            <div
                                className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2 transition-transform duration-200 ${openItemId === item.id ? 'rotate-90' : 'rotate-0'
                                    }`}
                            ></div>
                        </div>
                    </button>

                    {/* Плавное раскрытие с max-height */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openItemId === item.id
                            ? 'max-h-96 opacity-100 mt-3'
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