import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { ELEMENT_UL, ELEMENT_OL, toggleList } from "@udecode/plate-list";
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from "@udecode/plate-heading";
import { ELEMENT_LINK, getAndUpsertLink } from "@udecode/plate-link";
import { ToggleButton, Box, Divider, Tooltip } from "@mui/material";

import Looks3RoundedIcon from "@mui/icons-material/Looks3Rounded";
import LooksOneRoundedIcon from "@mui/icons-material/LooksOneRounded";
import LooksTwoRoundedIcon from "@mui/icons-material/LooksTwoRounded";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import FormatUnderlinedRoundedIcon from "@mui/icons-material/FormatUnderlinedRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";

import {
  getPluginType,
  isMarkActive,
  toggleMark,
  toggleNodeType,
  someNode,
  usePlateEditorState,
} from "@udecode/plate-core";

import {
  MARK_STRIKETHROUGH,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import StyledToggleButtonGroup from "../../Common/StyledToggleButtonGroup";

const baseProps = {
  size: "small",
  value: "",
};

export default function Toolbar() {
  const editor = usePlateEditorState();

  const getMarkProps = (key) => {
    return {
      ...baseProps,
      selected: isMarkActive(editor, key),
      onMouseDown: (e) => {
        e.preventDefault();
        toggleMark(editor, { key });
      },
    };
  };

  const getNodeProps = (key) => {
    const isDisabled =
      someNode(editor, { match: { type: ELEMENT_UL } }) ||
      someNode(editor, { match: { type: ELEMENT_OL } });
    return {
      ...baseProps,
      selected: someNode(editor, {
        match: {
          type: key,
        },
      }),
      disabled: isDisabled,
      onMouseDown: (e) => {
        e.preventDefault();
        toggleNodeType(editor, {
          activeType: key,
          inactiveType: ELEMENT_PARAGRAPH,
        });
      },
    };
  };

  const getLinkProps = (key, link) => {
    return {
      ...baseProps,
      selected: someNode(editor, {
        match: {
          type: key,
        },
      }),
      onMouseDown: (e) => {
        e.preventDefault();
        getAndUpsertLink(editor, link);
      },
    };
  };

  const getListProps = (key) => {
    return {
      ...baseProps,
      selected: someNode(editor, {
        match: {
          type: key,
        },
      }),
      onMouseDown: (e) => {
        e.preventDefault();
        toggleList(editor, { type: getPluginType(editor, key) });
      },
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        borderRadius: 2,
        marginBottom: "1rem",
      }}
    >
      <StyledToggleButtonGroup color="primary" sx={{}}>
        <ToggleButton {...getMarkProps(MARK_BOLD)}>
          <Tooltip title="Bold">
            <FormatBoldRoundedIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton {...getMarkProps(MARK_ITALIC)}>
          <Tooltip title="Italic">
            <FormatItalicRoundedIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton {...getMarkProps(MARK_UNDERLINE)}>
          <Tooltip title="Underline">
            <FormatUnderlinedRoundedIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton {...getMarkProps(MARK_STRIKETHROUGH)}>
          <Tooltip title="Strikethrough">
            <StrikethroughSRoundedIcon />
          </Tooltip>
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup color="primary">
        <ToggleButton {...getListProps(ELEMENT_UL)}>
          <Tooltip title="Bulleted List">
            <FormatListBulletedRoundedIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton {...getListProps(ELEMENT_OL)}>
          <Tooltip title="Numbered List">
            <FormatListNumberedRoundedIcon />
          </Tooltip>
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup color="primary">
        <ToggleButton {...getNodeProps(ELEMENT_H1)}>
          <Tooltip title="Heading 1">
            <LooksOneRoundedIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton {...getNodeProps(ELEMENT_H2)}>
          <Tooltip title="Heading 2">
            <LooksTwoRoundedIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton {...getNodeProps(ELEMENT_H3)}>
          <Tooltip title="Heading 3">
            <Looks3RoundedIcon />
          </Tooltip>
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup color="primary">
        <ToggleButton {...getLinkProps(ELEMENT_LINK)}>
          <Tooltip title="Link">
            <InsertLinkRoundedIcon />
          </Tooltip>
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  );
}
