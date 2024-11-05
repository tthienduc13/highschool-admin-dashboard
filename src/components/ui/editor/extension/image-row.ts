// extension/imageRow.ts

import { Node, mergeAttributes } from '@tiptap/core';

export const ImageRow = Node.create({
    name: 'imageRow',

    group: 'block',
    content: 'imageCustom{2,}', // Ensures it contains at least 2 `imageCustom` nodes

    parseHTML() {
        return [
            {
                tag: 'div[data-type="imageRow"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'imageRow',
                style: 'display: flex; gap: 10px;', // Displays images in a row with a gap between them
            }),
            0, // Render child nodes inside this container
        ];
    },
});
