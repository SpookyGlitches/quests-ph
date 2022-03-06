import {
  createBoldPlugin,
  createHistoryPlugin,
  createItalicPlugin,
  createListPlugin,
  createReactPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  createPlugins,
  createPlateUI,
  createParagraphPlugin,
  createHeadingPlugin,
  createLinkPlugin,
} from "@udecode/plate";

export const plugins = createPlugins(
  [
    createReactPlugin(),
    createHistoryPlugin(),

    createParagraphPlugin(),
    createHeadingPlugin(),

    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),

    createLinkPlugin(),
    createListPlugin(),
  ],
  {
    components: createPlateUI(),
  },
);
