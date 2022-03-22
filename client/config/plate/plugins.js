import {
  createBoldPlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
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
import { Link } from "@mui/material";

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

const LinkElement = (props) => {
  const { attributes, children, nodeProps, element } = props;
  console.log(props);
  return (
    <Link
      {...attributes}
      href={element.url}
      rel="noreferrer"
      {...nodeProps}
      target="_blank"
    >
      {children}
    </Link>
  );
};

// hacking!
const BoldElement = styled("strong")();
const ItalicElement = styled("em")();
const UnderlineElement = styled("u")();
const StrikethroughElement = styled("s")();
const H1Element = styled("h2")();
const H2Element = styled("h3")();
const H3Element = styled("h4")();

export const components = {
  [ELEMENT_UL]: UnorderedListElement,
  [ELEMENT_OL]: OrderedListElement,
  [MARK_BOLD]: BoldElement,
  [MARK_ITALIC]: ItalicElement,
  [MARK_UNDERLINE]: UnderlineElement,
  [MARK_STRIKETHROUGH]: StrikethroughElement,
  [ELEMENT_H1]: H1Element,
  [ELEMENT_H2]: H2Element,
  [ELEMENT_H3]: H3Element,
  [ELEMENT_LINK]: LinkElement,
};

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
    components,
  },
);
