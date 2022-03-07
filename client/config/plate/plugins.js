// import {
//   createBoldPlugin,
//   createHistoryPlugin,
//   createItalicPlugin,
//   createListPlugin,
//   createReactPlugin,
//   createStrikethroughPlugin,
//   createUnderlinePlugin,
//   createPlugins,
//   createPlateUI,
//   createParagraphPlugin,
//   createHeadingPlugin,
//   createLinkPlugin,
// } from "@udecode/plate";

import {
  createBasicMarksPlugin,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
} from "@udecode/plate-heading";
import { createParagraphPlugin } from "@udecode/plate-paragraph";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import { createListPlugin, ELEMENT_OL, ELEMENT_UL } from "@udecode/plate-list";
import {
  createReactPlugin,
  createHistoryPlugin,
  createPlugins,
} from "@udecode/plate-core";
import styled from "@emotion/styled";

const UnorderedListElement = styled("ul")(() => ({
  "& > div": {
    display: "list-item",
  },
}));

const OrderedListElement = styled("ol")(() => ({
  "& > div": {
    display: "list-item",
  },
}));

const LinkElement = styled("a")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const BoldElement = styled("b")();
const ItalicElement = styled("i")();
const UnderlineElement = styled("u")();
const StrikethroughElement = styled("s")();
const H1Element = styled("h1")();
const H2Element = styled("h2")();
const H3Element = styled("h3")();

export const plugins = createPlugins(
  [
    createReactPlugin(),
    createHistoryPlugin(),

    createParagraphPlugin(),
    createHeadingPlugin(),

    createBasicMarksPlugin(),

    createLinkPlugin(),
    createListPlugin(),
  ],
  {
    components: {
      [ELEMENT_UL]: UnorderedListElement,
      [ELEMENT_OL]: OrderedListElement,
      [ELEMENT_LINK]: LinkElement,
      [MARK_BOLD]: BoldElement,
      [MARK_ITALIC]: ItalicElement,
      [MARK_UNDERLINE]: UnderlineElement,
      [MARK_STRIKETHROUGH]: StrikethroughElement,
      [ELEMENT_H1]: H1Element,
      [ELEMENT_H2]: H2Element,
      [ELEMENT_H3]: H3Element,
    },
  },
);
