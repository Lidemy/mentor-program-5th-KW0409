export const selectIsLoadingPost = (store) => store.postState.isLoadingPost;
export const selectArticle = (store) => store.postState.article;
export const selectLimitPosts = (store) => store.postState.limitPosts;
export const selectTotalPage = (store) => store.postState.totalPage;
export const selectCurrentPage = (store) => store.postState.currentPage;
export const selectPostError = (store) => store.postState.error;

export const selectIsLoadingUser = (store) => store.userState.isLoadingUser;
export const selectUser = (store) => store.userState.user;
export const selectUserError = (store) => store.userState.error;
