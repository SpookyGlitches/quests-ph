import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { ELEMENT_UL, ELEMENT_OL, toggleList } from "@udecode/plate-list";
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from "@udecode/plate-heading";
import { ELEMENT_LINK, getAndUpsertLink } from "@udecode/plate-link";
import { ToggleButtonGroup, ToggleButton, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      padding: 3,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
      padding: 3,
    },
  },
}));

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
          <FormatBoldRoundedIcon />
        </ToggleButton>
        <ToggleButton {...getMarkProps(MARK_ITALIC)}>
          <FormatItalicRoundedIcon />
        </ToggleButton>
        <ToggleButton {...getMarkProps(MARK_UNDERLINE)}>
          <FormatUnderlinedRoundedIcon />
        </ToggleButton>
        <ToggleButton {...getMarkProps(MARK_STRIKETHROUGH)}>
          <StrikethroughSRoundedIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup color="primary">
        <ToggleButton {...getListProps(ELEMENT_UL)}>
          <FormatListBulletedRoundedIcon />
        </ToggleButton>
        <ToggleButton {...getListProps(ELEMENT_OL)}>
          <FormatListNumberedRoundedIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup color="primary">
        <ToggleButton {...getNodeProps(ELEMENT_H1)}>
          <LooksOneRoundedIcon />
        </ToggleButton>
        <ToggleButton {...getNodeProps(ELEMENT_H2)}>
          <LooksTwoRoundedIcon />
        </ToggleButton>
        <ToggleButton {...getNodeProps(ELEMENT_H3)}>
          <Looks3RoundedIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup color="primary">
        <ToggleButton {...getLinkProps(ELEMENT_LINK)}>
          <InsertLinkRoundedIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  );
}
