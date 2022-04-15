import { Paper, Divider } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostActions from "./PostActions";

const Post = ({ postId, questId, children, onSpecificPost }) => {
  const session = useSession();
  const userId = session.data?.user?.userId;
  const router = useRouter();
  const { data: post } = useSWR(
    postId && questId ? `/quests/${questId}/posts/${postId}` : null,
  );
  const { data: postReacts } = useSWR(
    questId && postId ? `/quests/${questId}/posts/${postId}/reacts` : null,
  );
  const isAuthor = post?.partyMember?.userId === userId;

  const navigateToPost = () => {
    if (!onSpecificPost) router.push(`/quests/${questId}/posts/${postId}`);
  };

  if (!post) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <PostHeader
          createdAt={post.createdAt}
          isAuthor={isAuthor}
          displayName={post.partyMember.user.displayName}
          image={post.partyMember.user.image}
          postId={postId}
          questId={questId}
        />

        <PostBody
          title={post.title}
          body={post.body}
          postFiles={post.postFiles}
          onClick={navigateToPost}
          onSpecificPost={onSpecificPost}
        />

        {postReacts && (
          <>
            <PostFooter
              postReacts={postReacts}
              commentsCount={post.comments.length}
              onCommentsCountClick={navigateToPost}
              postId={postId}
              questId={questId}
            />
            <Divider />
            <PostActions
              postReacts={postReacts}
              postId={postId}
              questId={questId}
            />
          </>
        )}

        {/* Comments Section */}
        {children}
      </Paper>
      {/* <Container maxWidth="md">
      </Container> */}
    </>
  );
};

export default Post;

// return (
//   <>
//     <Paper
//       sx={{
//         width: "100%",
//         padding: 2,
//         display: "flex",
//         flexDirection: "column",
//         gap: 1,
//       }}
//     >
//       {/* Post Header */}
//       <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//         <Avatar sx={{ backgroundColor: "pink" }}>
//           {post.partyMember.user.displayName}
//         </Avatar>
//         <Box sx={{ flexGrow: 1, alignItems: "flex-start" }}>
//           <Typography variant="body1" sx={{ m: 0, p: 0 }}>
//             {post.partyMember.user.displayName}
//           </Typography>
//           <Typography variant="body2" sx={{ fontWeight: "regular" }}>
//             {formatRelative(new Date(post.createdAt), new Date())}
//           </Typography>
//         </Box>
//         <Box>
//           {post.partyMember.user.userId === userId && (
//             <IconButton size="small" onClick={handlePostOptionsClick}>
//               <MoreHorizRoundedIcon />
//             </IconButton>
//           )}
//         </Box>
//       </Box>

//       {/* Post Content */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//         <Box sx={{ cursor: "pointer" }} onClick={navigateToPost}>
//           <Typography variant="h6" sx={{ fontWeight: "medium" }}>
//             {post.title}
//           </Typography>
//           <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//             {post.body}
//           </Typography>
//         </Box>
//         <Box style={{}}>
//           {postFiles && postFiles.length !== 0 && (
//             <Carousel
//               autoPlay={false}
//               sx={{
//                 zIndex: 1,
//                 width: "100%",
//                 height: "auto",
//               }}
//               indicators={false}
//             >
//               {postFiles.map((item) => {
//                 const link = `${process.env.NEXT_PUBLIC_FILES_BASE_LINK}/${item.key}`;
//                 return (
//                   <Box
//                     sx={{
//                       position: "relative",
//                       height: "400px",
//                       maxHeight: "400px",
//                       backgroundColor: "grey.200",
//                       cursor: "pointer",
//                     }}
//                     key={item.key}
//                   >
//                     <Image
//                       layout="fill"
//                       onClick={(event) => openImage(event, link)}
//                       objectFit="contain"
//                       alt={item.title}
//                       src={link}
//                     />
//                   </Box>
//                 );
//               })}
//             </Carousel>
//           )}
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             marginTop: 1,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <EmojiStack
//               spacing={-1}
//               height={30}
//               width={30}
//               reacts={post.postReacts}
//             />
//           </Box>
//           <Typography variant="caption" onClick={navigateToPost}>
//             {post.comments?.length || 0} comments
//           </Typography>
//         </Box>
//       </Box>

//       {/* Post Actions */}
//       <Box
//         sx={{
//           display: "flex",
//           width: "100%",
//           justifyContent: "center",
//           flexWrap: "wrap",
//           padding: 0,
//           gap: 4,
//         }}
//       >
//         <Button
//           variant="text"
//           startIcon={<AddReactionRoundedIcon />}
//           onClick={toggleReactOptions}
//           size="medium"
//         >
//           React
//         </Button>
//         <Button
//           onClick={navigateToPost}
//           variant="text"
//           startIcon={<InsertCommentRoundedIcon />}
//           size="medium"
//         >
//           Comment
//         </Button>
//       </Box>

//       {/* Comments  Section */}
//       {children}
//     </Paper>

//     <Menu
//       dense
//       open={openPostOptions}
//       anchorEl={postOptionsAnchor}
//       transition
//       onClose={closePostOptions}
//     >
//       <MenuItem dense onClick={navigateToEditPage}>
//         Edit
//       </MenuItem>
//       <MenuItem dense>Delete</MenuItem>
//     </Menu>
//     <ReactOptions
//       getSelected={() => getSelected(post.postReacts)}
//       handleReactClick={(type) => handleReactClick(type, post.postReacts)}
//       open={openReactOptions}
//       anchor={reactOptionsAnchor}
//       setOpen={setOpenReactOptions}
//     />
//   </>
// );
