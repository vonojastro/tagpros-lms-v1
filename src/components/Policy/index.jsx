import Page from 'components/Page';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Button } from 'react-bootstrap';
import { ArrowLeftCircle } from 'react-feather';

export default function Policy() {
  //?INFO policy param (parsed from /policies/:policy) is also the file name of the pdf
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const goBackToRegister = e => {
    e.preventDefault();
    navigate(`/register?${searchParams.toString()}`);
    // if(searchParams) {
    // }
  };

  const markdown = `
# Privacy Policy

Tagpros is committed to protecting your privacy: it’s the foundation for a safe and
trusted community. Our privacy policy outlines what information we collect from you,
how we use that information, and what choices you have regarding how and whether
we can use your information. Because Tagpros is a learning environment for children,
we take additional measures to safeguard children’s privacy, including for children under
the age of 13. Please see our Children Privacy Policy below, which further outlines our
approach. Thus, we are providing you our:

\`\`\`
Privacy Policy
Information We Collect
Our Use of Your Personal Data and Other Information
Storage
Our Disclosure of your Personal Data and Other Information
Public Posted Information
Children
Links to other URL
Social Media
Security
Do Not Track
Access and Accuracy; Correcting Personal Data
Cookie Policy
Other Terms and Conditions
Changes to Our Privacy Policy
Our Email
\`\`\`
## Our Policy

Welcome to the website (the “Site”) of Tagpros, Inc. (“Tagpros”). Tagpros is a service
that allows parents or guardians to enroll students in online small-group classes, and for
teachers to create, publicize, and provide those classes (the “Services”). This Privacy
Policy sets forth Tagpros’s policy with respect to the information collected from visitors
and users of the Tagpros Services. Capitalized terms not defined in this Privacy Policy


have the meaning as set forth in the Terms of Service for the Services, which can be
found at Terms of Service.

## Information We Collect

When you interact with us through the Services, we may collect information that, alone
or in combination could be used to identify you (“Personal Data“) and other information
from you, as further described below:

Personal Data That You Provide Through the Site: We collect Personal Data from you
when you voluntarily provide such information, such as when you contact us with
inquiries or register for an Tagpros account to access the Services. We may collect the
following information from you in order to provide our Services:

\`\`\`
● Name or publicly posted name from a Facebook linked account;
● Email address;
● Phone number;
● Zip code or city and state you are located in;
● Credit card or other payment information;
● Your child’s first name;
● Your child’s age or birthday;
● Your child’s email address;
● Video recordings of your child during classes;
● Your voluntarily provided profile picture or your Facebook picture linked to your
account;
● Information voluntarily provided in the “about me” section of your profile;
● Information voluntarily provided through reviews; and
● Notes you provide to teachers about yourself or your child when enrolling a
student.
\`\`\`
By voluntarily providing us with Personal Data, you are consenting to our use of it in
accordance with this Privacy Policy. If you provide Personal Data to our Services, you
acknowledge and agree that such Personal Data may be transferred from your current
location to the offices and servers of Tagpros and the authorized third parties referred to
herein.

Other Information:

Passively Collected Data: When you interact with us through the Site, we receive and
store certain data automatically. Tagpros may store such passively collected data itself


or such information may be included in databases owned and maintained by our
affiliates, agents or service providers. We may use such information and pool it with
other information to track, for example, the total number of visitors to our Sites, the
number of visitors to each page of our website, and the domain names of our visitors'
Internet service providers.

In operating our Sites, we and third parties that provide certain functionality to the
Tagpros Services may use a technology called "cookies." A cookie is a piece of
information that the computer that hosts our Services gives to your browser when you
access the Site. Our cookies help provide additional functionality to our Services and
help us analyze Site usage more accurately. On most web browsers, you will find a
“help” section on the toolbar. Please refer to this section for information on how to
receive a notification when you are receiving a new cookie and how to turn cookies off.
We recommend that you leave cookies turned on because they allow you to take
advantage of some of our Services’ features. For more information about our use of
cookies, please see the section entitled “Cookie Policy,” below.

Aggregated Personal Data: We may aggregate data, including Personal Data, and use
such aggregated data for any purpose. This aggregate information does not identify you
personally.

## Our Use of Your Personal Data and Other Information

We use your information to:

\`\`\`
● provide the Tagpros Services;
● process your payment for the Services;
● send you emails or newsletters that you signed up for;
● improve the Tagpros Services; and
● analyze website usage.
\`\`\`
Tagpros Teachers receive recordings of their classes and may use the recordings to
improve their curriculum and classes, and may provide the recording to Parents and the
participants in the class to view. Please note that in some cases, Classes are taught by
a “Teacher” that is actually an organization, group, or team of instructors (“Teacher
Organization”). In such cases, Class Recordings may be accessed by the entire
Teacher Organization, and access would not necessarily be limited to a single individual
instructor. Tagprosl may also use Class Recordings to provide feedback to Teachers, for
customer support, and for compliance purposes.


Tagpros will obtain additional parental consent before we use any Class Recordings for
promotional or other purposes. Tagpros and its affiliates may use your Personal Data to
contact you in the future to tell you about services we believe will be of interest to you. If
we do so, each promotional communication we send you will contain instructions
permitting you to "opt-out" of receiving future promotional information. In addition, if at
any time you wish not to receive any future communications or you wish to have your
name deleted from our mailing lists, please contact us at customercare@tagpros.us.
Please note that we will continue to contact you via email to respond to requests and
provide our Services.

## Storage

Your information, including Personal Data, may be transferred to — and maintained on
— computers located outside of your state, province, country or other governmental
jurisdiction where the data protection laws may differ from those from your jurisdiction. If
you are located outside the United States and choose to provide information to us,
please note that we transfer the data, including Personal Data, to the United States and
process it there.

## Our Disclosure of Your Personal Data and Other

## Information

We may share your Personal Data with certain third parties without further notice to you,
as set forth below:

Business Transfers: If we are involved in a merger, acquisition, financing due diligence,
reorganization, bankruptcy, receivership, sale of company assets, or transition of service
to another provider, your information may be transferred to a successor or affiliate alone
or as part of that transaction along with other assets.

Vendors and Service Providers: We engage third party vendors and service providers to
perform certain functions on our behalf (such as payment processing). These third
parties may have access to your Personal Data for the purpose of helping us market,
provide and/or improve the Services.

Legal Requirements: Tagpros may disclose your Personal Data if required to do so by
law or in the good faith belief that such action is necessary to (i) comply with a legal
obligation, (ii) protect and defend the rights or property of Tagpros, (iii) act in urgent


circumstances to protect the personal safety of users of the Site or the public, or (iv)
protect against legal liability.

## Publicly Posted Information

You may be able to share Personal Data with third parties, including with the general
public, through use of the Services.

User Profile: As a user of our Services, you will have a user profile that will be publicly
available to all users of the Services (the “User Profile”). You are not required to include
any Personal Data on your User Profile. But you will have the option to include a variety
of types of Personal Data in your User Profile, which may include your first name, last
name, biographical information, geographical location, and personal photograph.

We do not systematically monitor the content of information that is published on your
user profile. Any information published in your User Profile becomes available to the
public. After publishing, we have no control over how such information is used or its
further dissemination. We urge you to think carefully about what, if any, Personal Data
you include in your User Profile.

Public Forums: Our Services provide you the opportunity to share information on a
variety of topics with other Tagpros Users through public forums (the “Public Forums”).
Use of the Public Forums is entirely voluntary. But please be aware that any information
you include in the Public Forums will become available to all Tagpros Users without
restriction.

We do not systematically monitor the content of information that is published in the
Public Forums. Any information published in Public Forums becomes available to the
public. After publishing, we have no control over how such information is used or its
further dissemination. We urge you to think carefully about what, if any, Personal Data
you include in your posts on our Public Forums.

## Children

This section explains our information collection, disclosure, parental consent practices
and parental choice procedures with respect to information provided by children under
the age of 13 (“Child” or “Children”). This policy is in accordance with the U.S. Children’s
Online Privacy Protection Act (“COPPA”), and outlines our practices in the United States


regarding Children’s personal information. For more information about COPPA and
general tips about protecting Children’s online privacy, please visit OnGuard Online.

Collection: Tagpros collects information about students directly from Parents, who
provide us with the Child’s first name, age, type of schooling, local time zone, and
additional notes for the Teacher. In addition, Children may share information about
themselves during Classes. The Tagpros class sessions may take place over online
videos in which video images and audio of the Children are recorded. No information is
collected directly from Children until they are in the course session. Children cannot
post personal data publicly on the Tagpros Services.

Use and Disclosure: Tagpros shares the name, age, local time zone, and any notes
Parents have provided about their Child to the Class Teacher, in order to allow the
Teacher to provide Classes. This information shall also be treated as part of the Parent’s
“Personal Data” and may be shared as described in the Disclosure section above for
business transfers; to vendors and service providers; and to comply with legal
requirements. Children may also share information about themselves with the Teacher
and the rest of their class during the Class session voluntarily. While Tagpros expects
Teachers and all other Users to abide by our standards of conduct, please note that we
cannot control or monitor what personal information your Child shares with Teachers or
other classmates, nor what those third parties ultimately do with that information, and
we disclaim all responsibility in that regard.

Class Video Recordings: As described above, Tagpros records video of students and
teachers during Tagpros classes (“Class Recordings' '). The Class Recordings are made
available by Tagpros to the Teacher of the Class and may be shared by the Teacher for
the entire class (and their Parents) to view (the “Permitted Recipients''). Please note
that in some cases, Classes are taught by a “Teacher” undergoing observations from
school districts, groups, or a team of instructors (“Teacher Organization ''). In such
cases, Class Recordings may be accessed by these groups or entities, and access
would not necessarily be limited to a single individual instructor. Tagpros may also use
Class Recordings to provide feedback to Teachers, for customer support, for
compliance purposes, and for teaching and career development of teachers
internationally and locally. Tagpros will obtain additional parental consent before we use
any Class Recordings for promotional or other purposes. We utilize reasonable means
to (i) limit the ability of Teachers to create copies of the Class Recordings or to share the
Class Recordings with anyone aside from Permitted Recipients, and also (ii) limit the
ability of Permitted Recipients to download or re-share the Class Recordings. While we
expect Teachers and Permitted Recipients to abide by our standards of conduct, please


note that we cannot control or monitor what such third parties ultimately do with Class
Recordings, and disclaim all responsibility in that regard.

Parental Consent: Tagpros obtains verifiable parental consent before collecting
Personal Data from your Child. Tagpros requires that you provide your credit card
information in order to register your Child for and pay for a Tagpros Class. If you do not
consent, then we will not collect, use or disclose any personal information about your
Child, and your Child will not be allowed to use the Services in any way. If you are not
using our services for any other purposes and do not provide consent within a
reasonable time from the date the direct notice was sent, we will also delete your online
contact information from our records.

Parental Choices and Controls: At any time, you can refuse to permit us to collect
further Personal Data from your Children in association with your account, and can
request that we delete from our records the Personal Data we have collected in
connection with that account. Please keep in mind that a request to delete records may
lead to a termination of an account, membership, or other service. You may update your
Child’s information by logging onto your account. You can contact Tagpros to request
access to, change, or delete your Child’s personal information by sending an email to us
at customercare@tagpros.us. A valid request to delete personal information will be
accommodated within a reasonable time. In addition to the foregoing, we will exercise
commercially reasonable efforts to delete personal information belonging to Children
when it is no longer needed for the purpose for which it was collected.

## Links to Other Websites

This Privacy Policy applies only to the Tagpros Services. The Services may contain links
to other websites not operated or controlled by us (the “Third Party Sites”). The policies
and procedures we describe here do not apply to the Third Party Sites. The links from
our Services do not imply that we endorse or have reviewed the Third Party Sites. We
suggest contacting those sites directly for information on their privacy policies.

## Social Media

When you log into the Site using your Facebook account, we will collect relevant
information necessary to enable us to access your Facebook account; however you will
provide your login information, like your password, directly to Facebook (and not to
Tagpros). As part of such integration, Facebook will provide us with access to certain
information that you have provided to Facebook, and we will use, store and disclose


such information in accordance with this Privacy Policy and, if and to the extent
applicable, the policies of Facebook. However, please remember that the manner in
which Facebook uses, stores and disclose your information is governed by the policies
of Facebook, and, as a result, Tagpros shall not have any liability or responsibility for the
privacy practices or other actions of Facebook that may be enabled within and/or
otherwise accessible through our Services.

## Security

We take reasonable steps to protect the Personal Data provided via the Services from
loss, misuse and unauthorized access, disclosure, alteration, or destruction. However,
the Internet cannot be guaranteed to be fully secure and we cannot ensure or warrant
the security of any information you provide to us. We do not accept liability for
disclosures beyond our reasonable control. You are also responsible for helping to
protect the security of your account credentials. For instance, never give out your
password, and safeguard your user name, password and personal credentials when
you are using the Services, so that other people will not have access to your Personal
Data. Furthermore, you are responsible for maintaining the security of any personal
computing device on which you utilize the Services.

## Do Not Track

Do Not Track is a preference you can set in your web browser to inform websites that
you do not want to be tracked. You can enable or disable Do Not Track by visiting the
Preferences or Settings page of your web browser. While we do not currently support
Do Not Track signals, we treat the data of everyone who comes to our site in
accordance with this Privacy Policy, whatever their Do Not Track setting.

## Access and Accuracy; Correcting Personal Data.

You have the right to access the Personal Data we hold about you in order to verify the
Personal Data we have collected with respect to you and to have a general account of
our uses of that information. Upon receipt of your written request, we will provide you
with a copy of your Personal Data, although in certain limited circumstances we may not
be able to make all relevant information available to you, such as where that information
also pertains to another user. In such circumstances we will provide reasons for the
denial to you upon request. We will endeavor to deal with all requests for access and
modifications in a timely manner.


We will make every reasonable effort to keep your Personal Data accurate and up-to-
date, and we will provide you with mechanisms to correct, amend, delete, or limit the
use of your Personal Data. As appropriate, this amended Personal Data will be
transmitted to those parties to which we are permitted to disclose your information.
Having accurate Personal Data about you enables us to give you the best possible
service.

In certain circumstances, you have the right:

\`\`\`
● To access and receive a copy of the Personal Data we hold about you
● To rectify any Personal Data held about you that is inaccurate
● To request the deletion of Personal Data held about you
\`\`\`
You have the right to data portability for the information you provide to us. You can
request to obtain a copy of your Personal Data in a commonly used electronic format so
that you can manage and move it.

Please note that we may ask you to verify your identity before responding to such
requests.

### Our Use of Personal Information for Business Purposes in the Last

### Twelve Months

We use the Personal Information we collect, identified in each of the above categories,
for the business purposes disclosed within the Privacy Policy. These business purposes
include the following:

1. Auditing related to a current interaction with the consumer and concurrent
    transactions, including, but not limited to, counting ad impressions to unique
    visitors, verifying positioning and quality of ad impressions, and auditing
    compliance with this specification and other standards.
2. Detecting security incidents, protecting against malicious, deceptive, fraudulent,
    or illegal activity, and prosecuting those responsible for that activity.
3. Debugging to identify and repair errors that impair existing intended functionality.
4. Short-term, transient use, provided the personal information that is not disclosed
    to another third party and is not used to build a profile about a consumer or
    otherwise alter an individual consumer’s experience outside the current
    interaction, including, but not limited to, the contextual customization of ads
    shown as part of the same interaction.
5. Performing services on behalf of the business or service provider, including
    maintaining or servicing accounts, providing customer service, processing or


\`\`\`
fulfilling orders and transactions, verifying customer information, processing
payments, providing financing, providing advertising or marketing services,
providing analytic services, or providing similar services on behalf of the business
or service provider.
\`\`\`
6. Undertaking internal research for technological development and demonstration.
7. Undertaking activities to verify or maintain the quality or safety of a service or
    device that is owned, manufactured, manufactured for, or controlled by the
    business, and to improve, upgrade, or enhance the service or device that is
    owned, manufactured, manufactured for, or controlled by the business.

## Cookie Policy

### What are cookies?

Cookies are small text files containing a string of characters that can be placed on your
computer or mobile device that uniquely identify your browser or device.

### What are cookies used for?

Cookies allow a site or services to know if your computer or device has visited that site
or service before. Cookies can then be used to help understand how the site or service
is being used, help you navigate between pages efficiently, help remember your
preferences, and generally improve your browsing experience. Cookies can also help
ensure marketing you see online is more relevant to you and your interests.

### What types of cookies do we use?

There are generally four categories of cookies: “Strictly Necessary,” “Performance,”
“Functionality,” and “Targeting.” We routinely use all four categories of cookies on the
Service. You can find out more about each cookie category below.

1. Strictly Necessary Cookies. These cookies are essential, as they enable you to
    move around the Service and use its features, such as accessing logged in or
    secure areas. Because these cookies are essential, they cannot be disabled.
2. Performance Cookies. These cookies collect information about how you have
    used the Service, for example, information related to the unique username you
    have provided, so that less strain is placed on our backend infrastructure. These
    cookies may also be used to allow us to know that you have logged in so that we
    can serve you fresher content than a user who has never logged in. We also use
    cookies to track aggregate Service usage in an anonymized fashion and
    experiment with new features and changes on the Service. The information
    collected is used to improve how the Service works.


3. Functionality Cookies. These cookies allow us to remember how you’re logged in,
    whether you chose to no longer see advertisements, when you logged in or out,
    and the state or history of Service tools you’ve used. These cookies also allow us
    to tailor the Service to provide enhanced features and content for you and to
    remember how you’ve customized the Service in other ways. The information
    these cookies collect are anonymous, and they are not used to track your
    browsing activity on other sites or services.
4. Targeting Cookies. Us, our advertising partners or other third party partners may
    use these types of cookies to deliver advertising that is relevant to your interests.
    These cookies can remember that your device has visited a site or service, and
    may also be able to track your device’s browsing activity on other sites or
    services other than ours. This information may be shared with organizations
    outside of ours, such as advertisers and/or advertising networks to deliver the
    advertising, and to help measure the effectiveness of an advertising campaign, or
    other business partners for the purpose of providing aggregate Service usage
    statistics and aggregate Service testing.

### How long will cookies stay on my device?

The length of time a cookie will stay on your computer or mobile device depends on
whether it is a “persistent” or “session” cookie. Session cookies will only stay on your
device until you stop browsing. Persistent cookies stay on your computer or mobile
device until they expire or are deleted.

### How to control and review cookies.

You can adjust your cookie settings and see a complete list of the cookies currently
utilized on our service at any time by going to the following page: Tagpros Cookies.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being
sent. However, if you do not accept cookies, you may not be able to use some portions
of our Services.

## Other Terms and Conditions

Your access to and use of our Services is subject to the Terms of Service.

## Changes to Our Privacy Policy

We reserve the right to change this Privacy Policy at any time. If we decide to change
this Privacy Policy in the future, we will post or provide appropriate notice. Any non-


material change (such as clarifications) to this Privacy Policy will become effective on
the date the change is posted, and any material changes will become effective 30 days
from their posting on this page or via email to your listed email address. Unless stated
otherwise, our current Privacy Policy applies to all Personal Data that we have about
you and your account. The date on which the latest update was made is indicated at the
top of this document. We recommend that you print a copy of this Privacy Policy for your
reference and revisit this policy from time to time to ensure you are aware of any
changes. Your continued use of the Services signifies your acceptance of any changes.

## Contact Us

Please feel free to contact us if you have any questions about Tagpros’s Privacy Policy
or the information practices of our Services.

You may contact us as follows: You may send an email to customercare@tagpros.us.

      
  `;

  return (
    <Page withNavBar withFooter 
        navBarProps = {{
            transparentOnTop: true
        }}
    >
      { !!searchParams.toString().length && <div className='w-100 d-flex justify-content-between align-items-center'>
        <Button
          type='button'
          style={{ borderRadius: 99999 }}
          variant='info'
          className='d-flex justify-content-center align-items-center mb-3'
          onClick={goBackToRegister}
        >
          <ArrowLeftCircle size={25} className='mr-2' />
          <span style={{ fontSize: 13 }}>Continue Registration</span>
        </Button>
      </div> }

      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Page>
  );
}
