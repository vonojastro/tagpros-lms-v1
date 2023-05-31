const FILE_SIZE_HELPER_TEXT = 'Recommended file size of up to 5MB';
const GROUP_0_FIELD_NAMES = ['watchedVideo'];
const GROUP_1_FIELD_NAMES = [
  'professionalTitle',
  'schUniOrg',
  'address',
  'cvResume',
  'professionalLicense',
  'govtId',
  'refRecommendation',
  'teacherAchievement'
];
const GROUP_2_FIELD_NAMES = ['classTopics', 'classDescription'];
const GROUP_3_FIELD_NAMES = ['classSampleVid'];
const GROUP_4_FIELD_NAMES = [
  'agreeTermsAndConditions',
  'agreeClassContentPolicy',
  'agreeCommunityStandards'
];
const VIDEO_EXTENSIONS = ['mp4'];
const DOCUMENT_EXTENSIONS = ['pdf', 'doc', 'docx'];
const IMAGE_EXTENSIONS = ['png', 'jpeg', 'jpg'];

const FIELDS = [
  {
    name: 'watchedVideo',
    type: 'checkbox',
    label: 'Yes, I have watched the video.',
    required: true
  },
  {
    name: 'professionalTitle',
    type: 'text',
    label: 'Professional Title',
    helperText: `Please enter your full professional title or relevant title you want to call yourself.\n(example: Mr, Ms, Sir, Ma'am, Teacher, Tutor, Engineer or Engr, Attorney or Atty., Professor or Prof., Doctor or Dr.)`,
    required: true,
    maxlength: 36
  },
  {
    name: 'schUniOrg',
    type: 'text',
    label: 'School/University/Organization',
    helperText: 'Please enter the name of your school/university/organization',
    required: true
  },
  { name: 'address', type: 'text', label: 'Home Address', required: true },
  {
    name: 'cvResume',
    type: 'file',
    maxSize: 5,
    label: 'Curriculum Vitae/Resume',
    helperText: FILE_SIZE_HELPER_TEXT,
    extensions: DOCUMENT_EXTENSIONS.concat(IMAGE_EXTENSIONS),
    required: true
  },
  {
    name: 'professionalLicense',
    type: 'file',
    maxSize: 5,
    label: 'Valid Professional License/Work Portfolio',
    helperText: FILE_SIZE_HELPER_TEXT,
    extensions: DOCUMENT_EXTENSIONS.concat(IMAGE_EXTENSIONS),
    required: true
  },
  {
    name: 'govtId',
    type: 'file',
    maxSize: 5,
    label: 'Valid Government Identification',
    helperText: `Driver License, PRC Card, Voter's ID, Passport, SSS, TIN ID, and any City-Government IDs`,
    extensions: DOCUMENT_EXTENSIONS.concat(IMAGE_EXTENSIONS),
    required: true
  },
  {
    name: 'refRecommendation',
    type: 'file',
    maxSize: 5,
    label: 'References/Recommendation Letter',
    helperText: FILE_SIZE_HELPER_TEXT,
    extensions: DOCUMENT_EXTENSIONS.concat(IMAGE_EXTENSIONS)
  },
  {
    name: 'teacherAchievement',
    type: 'text-area',
    rows: 10,
    label: ' ',
    placeholder: ' ',
    helperText:
      'Please list any academic degrees, teaching credentials (current or expired), professional training, or other relevant professional certifications you hold. We do not require degrees to teach on Tagpros - include anything that will help us learn more about your background.\n\nPlease include year, subject, and state or institution.'
  },
  {
    name: 'classTopics',
    type: 'text-area',
    rows: 10,
    placeholder: 'Enter your answers here...',
    helperText:
      'Tagpros Partner Teachers create their own online classes.\nTell us what you plan to teach in Tagpros by answering the questions below:\n\n1.) What topics are you passionate about and would like to teach in Tagpros?\n2.) Have you taught these topics in face-to-face or online classes?\n3.) What is the age range of students that you are comfortable and confident to teach online?\n\nIts fine to share high-level topics here (no need to have the perfect class title).',
    required: true
  },
  {
    name: 'classDescription',
    type: 'text-area',
    rows: 10,
    helperText:
      "Now that you've shared us what you want to teach, let us know what your class will look like!\nWrite a sample class desciption below that would give parents and students a clear idea of what is in for them in your online classes.\nInclude information about the topics or skills that you will teach the class, and the concepts or skills learners should gain after undergoing you class.\n\nThis section should be at least a paragraph long.",
    placeholder: 'Enter your class description here...',
    required: true
  },
  {
    name: 'classSampleVid',
    type: 'file',
    fileType: 'video',
    extensions: VIDEO_EXTENSIONS,
    maxSize: 100,
    helperText: `It's time to show us how great you are as a teacher! Record a 3-5 minute video where you engagingly teach the sample online class you described earlier. This video is a way for our team to get a quick read on who you are and the kind of teaching environment you’ll provide to Tagpros learners. This video will stay private and will only be used to help us assess your application.
  \n • Show us (and show off!) the space where you will teach.
  \n • Show us your wonderful teaching personality.
  \n • Share your expertise! Keep in mind the age range you mentioned so we could get a glimpse of how you will teach your future students.
  \n\nUpload your video below. Keep in mind the following video requirements:
  
  \n • Length: 3-5 minutes long.
  \n • Orientation: landscape
  \n • Quality: minimum of 480p
  \n • Size: 100 MB
  \n • Format: mp4
  `,
    // required: true
  },
  {
    name: 'agreeTermsAndConditions',
    type: 'checkbox',
    topLabel: 'Terms & Conditions',
    label: 'I agree to the Terms & Conditions',
    required: true
  },
  {
    name: 'agreeClassContentPolicy',
    type: 'checkbox',
    topLabel: 'Class Content Policy',
    label: 'I agree to the Class Content Policy',
    required: true
  },
  {
    name: 'agreeCommunityStandards',
    type: 'checkbox',
    topLabel: 'Community Standards',
    label: 'I agree to the Community Standards',
    required: true
  }
];

const getFields = fieldNames =>
  FIELDS.filter(({ name }) => fieldNames.find(fN => fN === name));

const group0Fields = getFields(GROUP_0_FIELD_NAMES);
const group1Fields = getFields(GROUP_1_FIELD_NAMES);
const group2Fields = getFields(GROUP_2_FIELD_NAMES);
const group3Fields = getFields(GROUP_3_FIELD_NAMES);
const group4Fields = getFields(GROUP_4_FIELD_NAMES);

export {
  group0Fields,
  group1Fields,
  group2Fields,
  group3Fields,
  group4Fields,
  FIELDS,
  GROUP_0_FIELD_NAMES,
  GROUP_1_FIELD_NAMES,
  GROUP_2_FIELD_NAMES,
  GROUP_3_FIELD_NAMES,
  GROUP_4_FIELD_NAMES
};
