import Accordion from '@/components/ui/Accordion';
import { faqQuestions } from '@/data/faqData';

const Faq = () => {

    return (
        <section className="bg-white sm:py-15 py-6" id="catalog">
            <div className="container mx-auto px-4">
                <h2 className="title-2 mb-6">
                    Часто задаваемые вопросы
                </h2>

                <div className="flex flex-col max-w-3xl mx-auto">
                    <Accordion items={faqQuestions} />
                </div>
            </div>
        </section>
    );
}

export default Faq;