import draftToHtml from 'draftjs-to-html';
import React, { useCallback, useEffect, useRef } from 'react';

export default function MailContent({ mailContent, messageId }) {
  const ref = useRef(null);

  const getHTMLStringOfDraftContent = useCallback(() => {
    let res;
    try {
      res = draftToHtml((mailContent));
    } catch (error) {
      console.log(
        '🚀 ~ file: index.jsx ~ line 12 ~ getHTMLStringOfDraftContent ~ error',
        error
      );

      res = draftToHtml({
        blocks: [
          {
            key: '5v1sh',
            text: '(Invalid JSON format)',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          }
        ],
        entityMap: {}
      });
    }
    return res;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageId]);
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = getHTMLStringOfDraftContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageId]);
  return <div ref={ref} />;
}
