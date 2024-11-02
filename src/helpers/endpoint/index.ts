const prefixUserServices = "/users-service";

const prefixVersion = "/api/v1";
const prefixDocumentServices = "/documents-service";
const prefixMediaServices = "/media-service";
const prefixAnalyseServices = "/analyse-service";
const prefixDicussionServices = "/discussion-service";

const endpointAuth = {
    SIGN_IN: `${prefixUserServices}${prefixVersion}/authentication/login`,
};

const endpointUser = {
    GET_USER: `${prefixUserServices}${prefixVersion}/users`,
    UPDATE_STATUS_USER: `${prefixUserServices}${prefixVersion}/users/status`,
    GET_USER_DETAIL: (userId: string) =>
        `${prefixUserServices}${prefixVersion}/users/infor/${userId}`,
    UPDATE_USER: `${prefixUserServices}${prefixVersion}/users/baseuser`,
    CREATE_USER: `${prefixUserServices}${prefixVersion}/users/createaccount`,
};

const endpointRoadmap = {
    CREATE_ROADMAP: `${prefixAnalyseServices}${prefixVersion}/roadmap`,
    CREATE_ROADMAP_DETAIL: `${prefixAnalyseServices}${prefixVersion}/roadmap/detail`,
};

const endpointDocument = {
    GET_DOCUMENTS: `${prefixDocumentServices}${prefixVersion}/documents`,
};

const endpointSubject = {
    GET_ALL_COURSES: `${prefixDocumentServices}${prefixVersion}/subjects`,
    GET_BY_ID: (id: string) =>
        `${prefixDocumentServices}${prefixVersion}/subject/${id}`,
    CREATE_SUBJECT: `${prefixDocumentServices}${prefixVersion}/subject`,
    GET_BY_SLUG: `${prefixDocumentServices}${prefixVersion}/subject/slug`,
};

const endpointSearch = {
    SEARCH: `${prefixAnalyseServices}${prefixVersion}/search`,
};

const endpoinChapter = {
    GET_ALL_CHAPTER_BY_SUBJECTS: (subjectId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapter/subject/${subjectId}`,
    CREATE_CHAPTER: (subjectId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapter/subject/${subjectId}`,
};

const endpointLesson = {
    CREATE_LESSON_BY_CHAPTER: (chapterId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapter/${chapterId}/lesson`,
    GET_ALL_LESSONS_BY_CHAPTER: (chapterId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapter/${chapterId}/lessons`,
    GET_LESSON_BY_ID: (lessonId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapter/lesson/${lessonId}`,
};

const endPointTheory = {
    CREATE_THEORY: (lessonId: string) =>
        `${prefixDocumentServices}${prefixVersion}/theory/lesson/${lessonId}`,
    UPDATE_THEORY: (theoryId: string) =>
        `${prefixDocumentServices}${prefixVersion}/theory/${theoryId}`,
    CREATE_MATERIAL_THEORY: (theoryId: string) =>
        `${prefixMediaServices}${prefixVersion}/theory/${theoryId}`,
};

const endPointTag = {
    GET_ALL_TAG: `${prefixMediaServices}${prefixVersion}/newstags`,
    CREATE_TAG: `${prefixMediaServices}${prefixVersion}/newstag`,
};

const endPointBlog = {
    CREATE_BLOG: `${prefixDicussionServices}${prefixVersion}/new`,
    GET_ALL_BLOG: `${prefixDicussionServices}${prefixVersion}/news`,
};

const externalEndpoint = {
    GET_PROVINCE: "https://provinces.open-api.vn/api/",
};

const endPointVideo = {
    UPLOAD_VIDEO: `https://media-service-highschool.azurewebsites.net/api/video/video-chunk`,
    MERGE_VIDEO: (id: string) =>
        `https://media-service-highschool.azurewebsites.net/api/video/lesson/${id}/merge`,
};

export {
    endpointAuth,
    endpointUser,
    endpointSubject,
    endpoinChapter,
    endpointLesson,
    endPointTheory,
    endpointDocument,
    endpointRoadmap,
    externalEndpoint,
    endPointBlog,
    endPointTag,
    endPointVideo,
    endpointSearch,
};
