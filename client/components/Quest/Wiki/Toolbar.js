import {
  Looks3Rounded,
  LooksOneRounded,
  LooksTwoRounded,
  FormatBoldRounded,
  FormatItalicRounded,
  FormatUnderlinedRounded,
  FormatListBulletedRounded,
  StrikethroughSRounded,
  InsertLinkRounded,
  FormatListNumberedRounded,
} from "@mui/icons-material";
import {
  usePlateEditorRef,
  getPluginType,
  isMarkActive,
  toggleMark,
  toggleNodeType,
  ELEMENT_PARAGRAPH,
  someNode,
  getAndUpsertLink,
  toggleList,
  MARK_STRIKETHROUGH,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  ELEMENT_UL,
  ELEMENT_OL,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_LINK,
} from "@udecode/plate";
import { ToggleButtonGroup, ToggleButton, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function Toolbar() {
  const editor = usePlateEditorRef();

  const baseProps = {
    size: "small",
  };
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
    return {
      ...baseProps,
      selected: someNode(editor, {
        match: {
          type: key,
        },
      }),
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
        backgroundColor: "background.paper",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <StyledToggleButtonGroup color="primary" sx={{}}>
        <ToggleButton {...getMarkProps(MARK_BOLD)}>
          <FormatBoldRounded />
        </ToggleButton>
        <ToggleButton {...getMarkProps(MARK_ITALIC)}>
          <FormatItalicRounded />
        </ToggleButton>
        <ToggleButton {...getMarkProps(MARK_UNDERLINE)}>
          <FormatUnderlinedRounded />
        </ToggleButton>
        <ToggleButton {...getMarkProps(MARK_STRIKETHROUGH)}>
          <StrikethroughSRounded />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup color="primary">
        <ToggleButton {...getListProps(ELEMENT_UL)}>
          <FormatListBulletedRounded />
        </ToggleButton>
        <ToggleButton {...getListProps(ELEMENT_OL)}>
          <FormatListNumberedRounded />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup color="primary">
        <ToggleButton {...getNodeProps(ELEMENT_H1)}>
          <LooksOneRounded />
        </ToggleButton>
        <ToggleButton {...getNodeProps(ELEMENT_H2)}>
          <LooksTwoRounded />
        </ToggleButton>
        <ToggleButton {...getNodeProps(ELEMENT_H3)}>
          <Looks3Rounded />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup color="primary">
        <ToggleButton {...getLinkProps(ELEMENT_LINK)}>
          <InsertLinkRounded />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  );
}
