'use client';

import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      className='bg-transparent border-none shadow-none pb-3 pt-3'
      sx={{
        backgroundColor: 'transparent',
        '&::before': {
          opacity: 0,
        },
        '& .MuiButtonBase-root': {
          padding: '0px',
        },
        '& .MuiAccordionDetails-root': {
          paddingLeft: '0px',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className='text-gray-400 font-bold' />}
        aria-controls='panel-content'
        id='panel-header'
        className='text-white'
      >
        <p className='text-white font-semibold text-lg'>{question}</p>
      </AccordionSummary>
      <AccordionDetails>
        <p className='text-gray-300 mb-4 text-md'>{answer}</p>
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQItem;
