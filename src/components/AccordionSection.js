import React, { useState } from 'react';

const accordionItems = [
  {
    id: 1,
    question: 'How does CSS Grid auto-fit handle screen resizing without media queries?',
    answer: 'Using grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)), CSS Grid automatically calculates how many columns of at least 300px can fit in the row. As the viewport shrinks, cards automatically wrap to the next row without needing rigid @media breakpoints.'
  },
  {
    id: 2,
    question: 'What is the advantage of using CSS Custom Properties for theme switching?',
    answer: 'CSS variables live directly in the browser styling engine. When a theme attribute like data-theme="light" is updated on the <html> or <body> element, all referenced CSS variables recalculate instantaneously across the entire document without re-rendering component trees.'
  },
  {
    id: 3,
    question: 'How do Flexbox and CSS Grid work together in responsive web design?',
    answer: 'CSS Grid handles macro page structures (main card grids, overall dashboard panels, split hero sections), while Flexbox handles micro component alignments (navbars, card action headers, button groups, badge rows).'
  },
  {
    id: 4,
    question: 'What makes glassmorphism design visually appealing and readable?',
    answer: 'Glassmorphism relies on semi-transparent background colors (rgba), subtle high-contrast border strokes (1px solid rgba(255,255,255,0.08)), and backdrop-filter: blur(16px). This isolates foreground content while letting subtle background ambient gradients pass through.'
  }
];

const AccordionSection = () => {
  const [openId, setOpenId] = useState(1);

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="accordion-section" className="section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Interactive Disclosure</span>
          <h2 className="section-title">
            Responsive Interactive <span className="gradient-text">Accordion & FAQ</span>
          </h2>
          <p className="section-subtitle">
            Click on any item below to trigger accordion expansion and view CSS layout insights.
          </p>
        </div>

        <div className="accordion-wrapper">
          {accordionItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="accordion-header"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <div className="accordion-icon">
                    ▾
                  </div>
                </button>

                {isOpen && (
                  <div className="accordion-body">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
