const prefixUserServices = "/users-service";

const prefixVersion = "/api/v1";
const prefixDocumentServices = "/documents-service";
const prefixMediaServices = "/media-service";
const prefixAnalyseServices = "/analyse-service";

const endpointCurriculum = {
    GET: `${prefixDocumentServices}${prefixVersion}/curriculum`,
    CREATE: `${prefixDocumentServices}${prefixVersion}/curriculum`,
};

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

const endpointSubjectCurriculum = {
    CREATE: `${prefixDocumentServices}${prefixVersion}/subject-curriculum`,
    GET_PUBLISH: `${prefixDocumentServices}${prefixVersion}/subject-curriculum/publish`,
    GET_UNPUBLISH: `${prefixDocumentServices}${prefixVersion}/subject-curriculum/unpublish`,
    PUBLISH_COURSE: (courseId: string) =>
        `${prefixDocumentServices}${prefixVersion}/subject-curriculum/${courseId}/publish`,
    UNPUBLISH_COURSE: (courseId: string) =>
        `${prefixDocumentServices}${prefixVersion}/subject-curriculum/${courseId}/unpublish`,
};

const endpointSubject = {
    GET_ALL_COURSES: `${prefixDocumentServices}${prefixVersion}/subjects`,
    GET_UNPUBLISH_COURSES: `${prefixDocumentServices}${prefixVersion}/subjects/unpublish`,
    GET_UNBPUBLISH_BY_ID: (courseId: string) =>
        `${prefixDocumentServices}${prefixVersion}/subject/unpublish/${courseId}`,
    DELETE_COURSE: (courseId: string) =>
        `${prefixDocumentServices}${prefixVersion}/subject/${courseId}`,
    GET_BY_ID: (id: string) =>
        `${prefixDocumentServices}${prefixVersion}/subject/${id}`,
    PATH: `${prefixDocumentServices}${prefixVersion}/subject`,
    CREATE_SUBJECT: `${prefixDocumentServices}${prefixVersion}/subject`,
    GET_BY_SLUG: `${prefixDocumentServices}${prefixVersion}/subject/slug`,
    UNPUBLISH_COURSE: (courseId: string) =>
        `${prefixDocumentServices}${prefixVersion}/subject/${courseId}/unpublish`,
    GET_SUBJECTS: `${prefixDocumentServices}${prefixVersion}/subjects`,
};

const endpoinChapter = {
    GET_ALL_CHAPTER_BY_COURSE: (courseId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapter/subject-curriculum/${courseId}`,
    CREATE_CHAPTER_LIST: (courseId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapters/subject-curriculum/${courseId}`,
    UPDATE_CHAPTER: `${prefixDocumentServices}${prefixVersion}/chapter`,
};

const endpointLesson = {
    CREATE_LESSON_LIST: (chapterId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapter/${chapterId}/lessons`,
    GET_ALL_LESSONS_BY_CHAPTER: (chapterId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapter/${chapterId}/lessons`,
    GET_LESSON_BY_ID: (lessonId: string) =>
        `${prefixDocumentServices}${prefixVersion}/chapter/lesson/${lessonId}`,
    PATCH_LESSON: `${prefixDocumentServices}${prefixVersion}/lesson`,
    DELETE_LESSONS: `${prefixDocumentServices}${prefixVersion}/lessons`,
};

const endpointInformation = {
    CREATE_PROVINCES: `${prefixDocumentServices}${prefixVersion}/information/provinces`,
    GET_PROVINCES: `${prefixDocumentServices}${prefixVersion}/information/provinces`,
    CREATE_SCHOOLS: `${prefixDocumentServices}${prefixVersion}/information/province/schools`,
    GET_SCHOOLS: `${prefixDocumentServices}${prefixVersion}/information/schools`,
    GET_ALL_PROVINCE_SCHOOL: (provinceId: string) =>
        `${prefixDocumentServices}${prefixVersion}/information/provice/${provinceId}/schools`,
};

const endpointRoadmap = {
    CREATE_ROADMAP: `${prefixAnalyseServices}${prefixVersion}/roadmap`,
    CREATE_ROADMAP_DETAIL: `${prefixAnalyseServices}${prefixVersion}/roadmap/detail`,
};

const endpointDocument = {
    GET_DOCUMENTS: `${prefixDocumentServices}${prefixVersion}/documents/advance`,
    CREATE: `${prefixDocumentServices}${prefixVersion}/document`,
    DELETE: (id: string) =>
        `${prefixDocumentServices}${prefixVersion}/document/${id}`,
};

const endpointDocumentMedia = {
    CREATE: (id: string) =>
        `${prefixMediaServices}${prefixVersion}/document/${id}`,
};

const endpointCategory = {
    GET_ALL_CATEGORY: `${prefixDocumentServices}${prefixVersion}/categories`,
};

const endpointSearch = {
    SEARCH: `${prefixAnalyseServices}${prefixVersion}/search`,
};

const endPointTheory = {
    GET_LESSON_THEORY: (lessonId: string) =>
        `${prefixDocumentServices}${prefixVersion}/theory/lesson/${lessonId}`,
    GET_THEORY_BY_ID: (theoryId: string) =>
        `${prefixDocumentServices}${prefixVersion}/theory/${theoryId}`,
    CREATE_THEORY: (lessonId: string) =>
        `${prefixDocumentServices}${prefixVersion}/theory/lesson/${lessonId}`,
    UPDATE_THEORY: (theoryId: string) =>
        `${prefixDocumentServices}${prefixVersion}/theory/${theoryId}`,
    CREATE_MATERIAL_THEORY: (theoryId: string) =>
        `${prefixMediaServices}${prefixVersion}/theory/${theoryId}`,
    DELETE_THEORY: (theoryId: string) =>
        `${prefixDocumentServices}${prefixVersion}/theory/${theoryId}`,
};

const endPointTag = {
    GET_ALL_TAG: `${prefixMediaServices}${prefixVersion}/newstags`,
    CREATE_TAG: `${prefixMediaServices}${prefixVersion}/newstag`,
};

const endPointBlog = {
    CREATE_BLOG: `${prefixMediaServices}${prefixVersion}/new`,
    GET_NEWS: `${prefixMediaServices}${prefixVersion}/news`,
    GET_NEWS_DETAIL: (slug: string) =>
        `${prefixMediaServices}${prefixVersion}/new/slug/${slug}`,
};

const externalEndpoint = {
    GET_PROVINCE: "https://provinces.open-api.vn/api/",
};

const endPointVideo = {
    UPLOAD_VIDEO: `https://media-service-highschool.azurewebsites.net/api/video/video-chunk`,
    MERGE_VIDEO: (id: string) =>
        `https://media-service-highschool.azurewebsites.net/api/video/lesson/${id}/merge`,
};

const endPointUniversity = {
    GET_UNIVERSITY: `${prefixUserServices}${prefixVersion}/university`,
    GET_UNIVERSITY_NAME: `${prefixUserServices}${prefixVersion}/university/name`,
    CREATE_UNIVERSITY: `${prefixUserServices}${prefixVersion}/university`,
    GET_UNIVERSITY_DETAIL: (universityId: string) =>
        `${prefixUserServices}${prefixVersion}/university/${universityId}`,
    UPDATE_UNIVERSITY: (universityId: string) =>
        `${prefixUserServices}${prefixVersion}/university/${universityId}`,
    DELETE_UNIVERSITY: (universityId: string) =>
        `${prefixUserServices}${prefixVersion}/university/${universityId}`,
    GET_UNIVERSITY_MAJOR: `${prefixUserServices}${prefixVersion}/universityMajor`,
    GET_UNIVERSITY_MAJOR_NAME: `${prefixUserServices}${prefixVersion}/universityMajor/name`,
    CREATE_UNIVERSITY_MAJOR: `${prefixUserServices}${prefixVersion}/universityMajor`,
    UPDATE_UNIVERSITY_MAJOR: (universityMajorId: string) =>
        `${prefixUserServices}${prefixVersion}/universityMajor/${universityMajorId}`,
    DELETE_UNIVERSITY_MAJOR: (universityMajorId: string) =>
        `${prefixUserServices}${prefixVersion}/universityMajor/${universityMajorId}`,
};

const endPointOccupation = {
    GET_OCCUPATIONS: `${prefixUserServices}${prefixVersion}/occupation`,
    CREATE_OCCUPATION: `${prefixUserServices}${prefixVersion}/occupation`,
    UPDATE_OCCUPATION: (occupationId: string) =>
        `${prefixUserServices}${prefixVersion}/occupation/${occupationId}`,
    DELETE_OCCUPATION: (occupationId: string) =>
        `${prefixUserServices}${prefixVersion}/occupation/${occupationId}`,
};

const endPointMajor = {
    GET_MAJOR: `${prefixUserServices}${prefixVersion}/major`,
    GET_MAJOR_NAME: `${prefixUserServices}${prefixVersion}/major/name`,
    CREATE_MAJOR: `${prefixUserServices}${prefixVersion}/major`,
    UPDATE_MAJOR: (majorId: string) =>
        `${prefixUserServices}${prefixVersion}/major/${majorId}`,
    DELETE_MAJOR: (majorId: string) =>
        `${prefixUserServices}${prefixVersion}/major/${majorId}`,
    GET_MAJOR_CATEGORY: `${prefixUserServices}${prefixVersion}/majorCategory`,
    GET_MAJOR_CATEGORY_NAME: `${prefixUserServices}${prefixVersion}/majorCategory/name`,
    CREATE_MAJOR_CATEGORY: `${prefixUserServices}${prefixVersion}/majorCategory`,
    UPDATE_MAJOR_CATEGORY: (majorCategoryId: string) =>
        `${prefixUserServices}${prefixVersion}/majorCategory/${majorCategoryId}`,
    DELETE_MAJOR_CATEGORY: (majorCategoryId: string) =>
        `${prefixUserServices}${prefixVersion}/majorCategory/${majorCategoryId}`,
};

const endPointQuiz = {
    GET_QUIZ: `${prefixDocumentServices}${prefixVersion}/questions/quiz`,
    CREATE_QUIZ: `${prefixDocumentServices}${prefixVersion}/questions`,
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
    endpointCategory,
    endpointInformation,
    endpointCurriculum,
    endpointSubjectCurriculum,
    endpointDocumentMedia,
    endPointUniversity,
    endPointOccupation,
    endPointMajor,
    endPointQuiz,
};
