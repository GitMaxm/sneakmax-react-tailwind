import Accordion from '@/components/ui/Accordion';
import { faqQuestions } from '@/data/faqData';

const Faq = () => {
  return (
    <section className="bg-white py-6 sm:py-15" id="catalog">
      <div className="container mx-auto px-4">
        <h2 className="title-2 mb-6">Часто задаваемые вопросы</h2>

        <div className="mx-auto flex max-w-3xl flex-col">
          <Accordion items={faqQuestions} />
        </div>
      </div>
    </section>
  );
};

export default Faq;
