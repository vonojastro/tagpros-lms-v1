import { Field, Form, FormSpy, useField } from 'react-final-form';
import _ from 'lodash';
import { ArrowLeftCircle, AtSign } from 'react-feather';
import { useToggle } from '../../hooks/useToggle';
import { Button, Modal } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { submitRegistration } from '../../api/registration';
import { toast } from 'react-toastify';
import { getSchoolTypes } from '../../api/school-types';
import { schema } from '../../validators/registration2';
import styled from 'styled-components';
import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import {
  CheckBoxControl,
  InputControl,
  SelectControl,
  TextAreaControl
} from 'components/common/Form/Inputs';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useValidationSchema from 'hooks/use-validation-schema';
import { Country } from 'country-state-city';
import { SOCIAL_AUTH_PROVIDERS, USER_TYPE } from 'utils/constants';
import { setHasEverLoggedIn } from '../../utils/auth';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setAccountType, setSocialAuthToken } from 'redux/actions/auth';
import FacebookLogin from '@greatsumini/react-facebook-login';
import useFreshdeskHelpWidget from 'hooks/use-freshdesk-help-widget';
import '../../css/style.scoped.css';

const AgreeToTermsCheckbox = ({ values  }) => {
  const [privacyPolicyLink, setPrivacyPolicyLink] = useState(
    `/policies/privacy?provider=${values?.provider}`
  );
  const convertValuesToSearchParams = () => {
    const searchParams = new URLSearchParams();
    Object.keys(values).forEach(key => {
      searchParams.append(key, values[key]);
    });
    return searchParams;
  };
  useEffect(() => {
    setPrivacyPolicyLink(`/policies/privacy?${convertValuesToSearchParams()}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertValuesToSearchParams()]);
  const terms = `
**Welcome to Tagpros!**

Tagpros, Inc. (“Tagpros” “we,” “us,” “our”) provides its services (described below) to you through its website located at tagpros.us (the “Site”) and through its mobile applications and related services (collectively, such services, including any new features and applications, and the Site, the “Service(s)”), subject to the following Terms of Service (as amended from time to time, the “Terms of Service”). We reserve the right, at our sole discretion, to change or modify portions of these Terms of Service at any time. If we do this, we will post the changes on this page and will indicate at the top of this page the date these terms were last revised. We will also notify you, either through the Services user interface, in an email notification or through other reasonable means. Any such changes will become effective no earlier than fourteen (14) days after they are posted, except that changes addressing new functions of the Services or changes made for legal reasons will be effective immediately. Your continued use of the Service after the date any such changes become effective constitutes your acceptance of the new Terms of Service.

Please read these Terms of Service carefully, as they contain an agreement to arbitrate and other important information regarding your legal rights, remedies, and obligations. The agreement to arbitrate requires (with limited exception) that you submit claims you have against us to binding and final arbitration, and further (1) you will only be permitted to pursue claims against Tagpros on an individual basis, not as a plaintiff or class member in any class or representative action or proceeding, and (2) you will only be permitted to seek relief (including monetary, injunctive, and declaratory relief) on an individual basis.

When using certain aspects of the Services or using certain Services, you will be subject to any additional terms applicable to such services that may be posted on the Service from time to time, including, without limitation, our [Privacy Policy](${privacyPolicyLink}) Community Standards, Class Content Policy, and Teacher Guide. Community Standards,  Class Content Policy , and Teacher Guide. All such terms are hereby incorporated by reference into these Terms of Service.

The Services consist of an online marketplace and platform through which Teachers may offer Classes for sale to Parents, and Parents may purchase such Classes for the benefit of their children. While Tagpros strives to high standards of service, you acknowledge and agree that: (1) Tagpros is not a party to any agreements entered into between Teachers and Parents, (2) Tagpros only provides certain tools to facilitate the purchase, sale and provision of Classes, (3) Parents contract for classes directly with Teachers (4) Tagpros is not a broker, agent (except as expressly set forth below) or insurer, and (5) Tagpros disclaims all liability for the conduct of Teachers, Parents, or any other Users of the Site or Classes. Different sections of the Site and Terms of Service affect Teachers and Parents differently, so please be sure to read these Terms of Service carefully.

**Key Terms**

“User” “you” or “your” means a person, organization or entity using the Services, including Parents and Teachers.

“Parent(s)” means a parent or legal guardian who completes Tagpros’s account registration process to purchase Classes on the Site for the purpose of enrolling their child.

“Teacher(s)” means a person who completes Tagpros’s account registration process to sell Classes on the Site, or an organization that executes an agreement with Tagpros to sell Classes on the Site.

“Class(es)” means any online class(es) submitted by a Teacher for sale on the Site.

**Access and Use of the Service**

**Services Description:** Tagpros’’s Service is an online marketplace for K-12 classes, designed for Parents to find and book Classes for the benefit of their child or children, and for Teachers to market, sell and conduct their Classes. As the provider of an online marketplace, Tagpros does not own, create, sell, resell, control, or manage any Classes. Tagpros's responsibilities are limited to: (i) providing the Site as an online marketplace and platform to facilitate the sale, purchase, and conduct of Classes, and (ii) serving as the limited agent of each Teacher for the purpose of accepting payments from a Parent on behalf of the Teacher. There are risks that you assume when dealing with other Users (including those who may be acting under false pretenses). While Tagpros strives to provide a safe and welcoming environment (how do we safeguard) for its Users, you agree that all of these risks are ultimately borne by you, and not Tagpros. Tagpros does not control the behavior of Users or the quality of the Classes. As a result, Tagpros cannot guarantee the authenticity, quality, safety, legality, or appropriateness of the Classes.

**Your Registration Obligations:** You will be required to register with Tagpros in order to access and use certain features of the Service. If you choose to register for the Service, you agree to provide and maintain true, accurate, current and complete information about yourself as prompted by the Service’s registration form. Registration data and certain other information about you are governed by our [Privacy Policy](${privacyPolicyLink}). You must be of legal age to form a binding contract to register for the Service (in many jurisdictions, this age is 18). If you are not yet of legal age to form a binding contract, then you must get your Parent to read these Terms of Service and agree to them for you before you use the Service. If you are a Parent and you provide your consent to your child's use of the Service, then you agree to be bound by these Terms of Service with respect to your child’s use of the Service.

**Member Account, Password and Security:** You are responsible for maintaining the confidentiality of your password and account, if any, and are fully responsible for any and all activities that occur under your password or account. You agree to (a) immediately notify Tagpros of any unauthorized use of your password or account or any other breach of security, and (b) ensure that you exit from your account at the end of each session when accessing the Service. Tagpros will not be liable for any loss or damage arising from your failure to comply with this Section.

**Modifications to Service:** Tagpros reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Tagpros will not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.

**General Practices Regarding Use and Storage:** You acknowledge that Tagpros may establish general practices and limits concerning use of the Service, including without limitation the maximum period of time that data or other content will be retained by the Service and the maximum storage space that will be allotted on Tagpros’s servers on your behalf. You agree that Tagpros has no responsibility or liability for the deletion or failure to store any data or other content maintained or uploaded by the Service. You acknowledge that Tagpros reserves the right to terminate accounts that are inactive for an extended period of time. You further acknowledge that Tagpros reserves the right to change these general practices and limits at any time, in its sole discretion, with or without notice.

**Class Recordings:** Classes that take place through Tagpros’s video chat platform are automatically recorded by Tagpros (“Class Recordings”). We value student and Teacher privacy, and our use of Class Recordings is extremely limited. Specifically, Class Recordings are made available only to the Teacher providing the Class in question, in order to allow them to (1) provide a viewable copy to students who missed the Class, or who wish to review the Class, for their personal educational purposes; and (2) review the Class Recording personally in order to improve their Classes. Please note that in some cases, Classes are taught by a Teacher that is actually an organization, group, or team of instructors. In such cases, Class Recordings may be accessed by the organization, and access would not necessarily be limited to a single individual instructor. In addition, Tagpros may use Class Recordings to provide feedback to Teachers, to improve our Services, for customer support, and for compliance purposes. Tagpros retains Class Recordings for six months after the date of the applicable Class, subject to our Privacy Policy, after which they are deleted. Notwithstanding the foregoing, Tagpros will also delete Class Recordings earlier than six months under the following circumstances: (a) upon the request of a Parent for the deletion of their child’s personally identifiable information, or (b) upon the reasonable determination of Tagpros that a Class Recording should be removed to protect the privacy of certain Users or because of violations of these Terms of Service. We will not use Class Recordings containing images of you (or your children) for promotional or any other purposes without your express written consent.  **By using the services, you consent to you and/or your child appearing in Class Recordings for the limited purposes set forth above.**

**Certain Teacher Obligations**

As a Teacher, you must provide Tagpros with any information requested in order for Tagpros to list your Classes through its Services including but not limited to a description of the Classes and the price for the Classes. Tagpros has sole discretion as to which Classes we list on the marketplace and we reserve the right to reject any Classes or remove Classes from the marketplace for any reason. Additionally, Tagpros has discretion to edit Class descriptions as needed to conform them to our marketplace standards. Tagpros has sole discretion as to which Teachers are accepted into the marketplace and we reserve the right to reject any potential Teacher and remove or suspend any Teacher from the marketplace for any reason. Tagpros may, but is not required to, conduct background checks on and interviews of Teachers in its discretion and solely for its own benefit. As a Teacher, you agree to provide written and/or electronic consent to such background checks and to participate truthfully in such interviews.

When you join the Tagpros community, you agree to follow our policies, including our community standards. Those expectations include thoughtful and professional communications with our community (colleagues, parents, children), modeling appropriate behavior for our learners, and acting professionally. In addition, you agree to use social media, blogs, and other online forums, in an appropriate manner. Inappropriate behavior in any Tagpros-affiliated online forum includes, but is not limited to: behavior intended to provoke, bully, demean, or cause harm to others, or to create conflict; or any other posts or content that Tagpros, in its discretion, believes to be unconducive to a respectful and welcoming community for all. Inappropriate behavior in any online forum includes, but is not limited to: posting online or speaking to the media on Tagpros’s behalf without prior written authorization from Tagpros; posts that Tagpros, in its discretion, finds to be offensive or inappropriate based on race, sex, age, gender, sexual orientation, gender identity or expression, national origin, disability or medical condition, veteran status, or any other legally protected characteristic; derogatory, disparaging, or disrespectful comments about learners, teachers, parents, or Tagpros staff, even if the target is not identified by name; sharing any private material, communication, or information regarding parents of learners, including but not limited to students’ or parents’ names, photos, conversations, emails, student academic or performance information, screenshots of student work, or any other personal identifying information; posts that may be harmful to Tagpros’s ongoing business operations; sharing content that contains or promotes hate speech, threats of violence, or the endangerment of children; and any other violation of Tagpros’s community standards.

Each Teacher is solely responsible for obtaining all licenses and other permissions required to offer or provide any Classes, and Tagpros assumes no responsibility for a Teacher's failure to obtain such licenses or permissions or otherwise comply with any applicable laws, rules or regulations.

You understand and agree that Tagpros is not an insurer, agent or employer for you as a Teacher. If a Parent purchases any of your Classes, any agreement you enter into with such Parent is between you and the Parent, and Tagpros is not a party thereto. Notwithstanding the foregoing, Tagpros is authorized to serve as your limited agent purely for the purpose of accepting payments from Parents on your behalf and transmitting such payments to you (minus our Fees). You acknowledge and agree that, as a Teacher, you are responsible for your own acts and omissions while using the Services. With the sole exception of students enrolled in the applicable Class, and/or their Parents, you further agree that you will not share any Class Recordings made available to you by Tagpros to any third parties. Allowing other Teachers within your organization to view the Class Recordings, however, is permissible.

To the extent that you are using the Services as a Teacher, you agree to abide by the terms of our Teacher Guide.

**Payment Terms**

**General:** Each Parent agrees to pay all applicable fees for Classes (“Enrollment Fees”) as set forth on the Site. All Enrollment Fees are payable in the currency specified on the Site at the time of purchase. You shall be responsible for all taxes associated with the Services other than U.S. taxes based on Company’s net income. Parent hereby authorizes Tagpros to bill Parent’s payment instrument upon confirmation of a purchase, and Parent further agrees to pay any charges so incurred. If Parent disputes any charges you must let Tagpros know within sixty (60) days after the date that Tagpros charges you.

**Teacher Payment:** Tagpros will transfer the Enrollment Fees to Teacher’s Paypal account for each sale of a Class (or set of Classes, as applicable) to a Parent within a reasonable period of time, minus Tagpros’s service fees (“Tagpros Fee”), according to the schedule and policies detailed in our Teachers Guide. In order to transfer funds to Teacher’s Paypal account, Teacher shall sign up for a Paypal account. Tagpros has discretion to act on behalf of the Parent, and to not transfer the Enrollment Fees to Teacher, if Parent reports that the Classes were not provided or adequately completed. This may include but is not limited to circumstances where a Teacher did not arrive for a Class or a Class was of insufficient quality. Tagpros will independently review such cases, seeking input from the Parent and/or the Teacher, and may decide at its sole discretion to issue a refund to the Parent. All determinations of Tagpros with respect to a refund shall be final and binding on the Parent and Teacher.

**Limited Payment Collections Agent:** Each Teacher appoints Tagpros as the Teacher’s limited payment collection agent solely for the purpose of accepting the Enrollment Fees from Parent. Each User agrees that payment of Enrollment Fees by a Parent to Tagpros, as that Teacher’s limited payment collection agent, shall be considered the same as a payment made directly by such Parent to the relevant Teacher and the Teacher will provide the relevant Classes to the Parent, as outlined on the Site, as if the Teacher had received payment directly. Tagpros, as limited payment collection agent for the Teacher, agrees to facilitate the payment of any Enrollment Fees (less the Tagpros Fee) for Classes pursuant to these Terms of Service unless otherwise agreed between Tagpros and the Teacher. In the event that Tagpros does not remit such amounts, the Teacher will have recourse only against Tagpros.

**Conditions of Use**

**User Conduct:** You are solely responsible for all code, video, images, information, data, text, software, music, sound, photographs, graphics, messages or other materials (“content”) that you upload, post, publish or display (hereinafter, “upload”) or email or otherwise use via the Service. The following are examples of the kind of content and/or use that is illegal or prohibited by Tagpros. Tagpros reserves the right to investigate and take appropriate legal action against anyone who, in Tagpros’s sole discretion, violates this provision, including without limitation, removing the offending content from the Service, suspending or terminating the account of such violators and reporting you to the law enforcement authorities. You agree to not use the Service to:

*   email or otherwise upload any content that (i) infringes any intellectual property or other proprietary rights of any party; (ii) you do not have a right to upload under any law or under contractual or fiduciary relationships; (iii) contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; (iv) poses or creates a privacy or security risk to any person; (v) constitutes unsolicited or unauthorized advertising, promotional materials, commercial activities and/or sales, “junk mail,” “spam,” “chain letters,” “pyramid schemes,” “contests,” “sweepstakes,” or any other form of solicitation; (vi) is unlawful, harmful, threatening, abusive, harassing, tortious, excessively violent, defamatory, vulgar, obscene, pornographic, libelous, invasive of another’s privacy, hateful racially, ethnically or otherwise objectionable; or (vii) in the sole judgment of Tagpros, is objectionable or which restricts or inhibits any other person from using or enjoying the Service, or which may expose Tagpros or its users to any harm or liability of any type;
*   interfere with or disrupt the Service or servers or networks connected to the Service, or disobey any requirements, procedures, policies or regulations of networks connected to the Service; or
*   violate any applicable local, state, national or international law, or any regulations having the force of law;
*   impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;
*   solicit personal information from anyone in violation of our Privacy Policy.
*   harvest or collect email addresses or other contact information of other users from the Service by electronic or other means for the purposes of sending unsolicited emails or other unsolicited communications;
*   advertise or offer to sell or buy any goods or services for any business purpose that is not specifically authorized;
*   further or promote any criminal activity or enterprise or provide instructional information about illegal activities; or
*   obtain or attempt to access or otherwise obtain any materials or information through any means not intentionally made available or provided for through the Service.

**Special Notice for International Use; Export Controls:** Software (defined below) available in connection with the Service and the transmission of applicable data, if any, is subject to United States export controls. No Software may be downloaded from the Service or otherwise exported or re-exported in violation of U.S. and and other applicable laws. Downloading or using the Software is at your sole risk. Recognizing the global nature of the Internet, you agree to comply with all local rules and laws regarding your use of the Service, including as it concerns online conduct and acceptable content.

**Commercial Use:** Unless otherwise expressly authorized herein or in the Service, you agree not to display, distribute, license, perform, publish, reproduce, duplicate, copy, create derivative works from, modify, sell, resell, exploit, transfer or upload for any commercial purposes, any portion of the Service, use of the Service, or access to the Service.

**Intellectual Property Rights**

**Service Content, Software and Trademarks:** You acknowledge and agree that the Service may contain content or features (“Service Content”) that are protected by copyright, patent, trademark, trade secret or other proprietary rights and laws. Except as expressly authorized by Tagpros, you agree not to modify, copy, frame, scrape, rent, lease, loan, sell, distribute or create derivative works based on the Service or the Service Content, in whole or in part, except that the foregoing does not apply to your own User Content (as defined below) that you legally upload to the Service. For the sake of clarity, you acknowledge and agree that Class Recordings constitute Service Content, not User Content. In connection with your use of the Service you will not engage in or use any data mining, robots, scraping or similar data gathering or extraction methods. If you are blocked by Tagpros from accessing the Service (including by blocking your IP address), you agree not to implement any measures to circumvent such blocking (e.g., by masking your IP address or using a proxy IP address). Any use of the Service or the Service Content other than as specifically authorized herein is strictly prohibited. The technology and software underlying the Service or distributed in connection therewith are the property of Tagpros our affiliates and our partners (the “Software”). You agree not to copy, modify, create a derivative work of, reverse engineer, reverse assemble or otherwise attempt to discover any source code, sell, assign, sublicense, or otherwise transfer any right in the Software. Any rights not expressly granted herein are reserved by Tagpros.

The Tagpros name and logos are trademarks and service marks of Tagpros (collectively the “TagprosTrademarks”). Other Tagpros, product, and service names and logos used and displayed via the Service may be trademarks or service marks of their respective owners who may or may not endorse or be affiliated with or connected to Tagpros. You should not interpret anything in these Terms of Service or the Service to mean that Tagpros is in any way explicitly or implicitly giving you any license or right to use any of TagprosTrademarks displayed on the Service, without our prior written permission in each instance. All goodwill generated from the use of TagprosTrademarks is only for Tagpros’s exclusive benefit.

**Third Party Material:** Under no circumstances will Tagpros be liable in any way for any content or materials of any third parties (including users), including, but not limited to, for any errors or omissions in any content, or for any loss or damage of any kind incurred as a result of the use of any such content. You acknowledge that Tagpros may, but is not required to, pre-screen content, and Tagpros and its designees will have the right (but not the obligation) in their sole discretion to refuse or remove any content that is available via the Service. Without limiting the foregoing, Tagpros and its designees will have the right to remove any content that violates these Terms of Service or is deemed by Tagpros, in its sole discretion, to be otherwise objectionable. You agree that you must evaluate, and bear all risks associated with, the use of any content, including any reliance on the accuracy, completeness, or usefulness of such content.

**User Content Transmitted Through the Service:** With respect to the content or other materials you upload through the Service or share with other users or recipients (collectively, “User Content”), you represent and warrant that you own all right, title and interest in and to such User Content, including, without limitation, all copyrights and rights of publicity contained therein. You shall retain any intellectual property rights that you hold in your User Content, and Tagpros does not claim any ownership (copyright, trademark, or otherwise) over your User Content. By submitting, posting or otherwise uploading User Content on or through the Services you give Tagpros a worldwide, nonexclusive, perpetual, irrevocable, fully sub-licensable, royalty-free right and license as set below:

*   with respect to User Content that you submit, post or otherwise make publicly or generally available via the Service (e.g. public forum posts), the license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, publicly perform, and publicly display such User Content (in whole or part) worldwide via the Services or otherwise, and/or to incorporate it in other works in any form, media, or technology now known or later developed for any legal business purpose; and
*   with respect to User Content that you submit, post or otherwise transmit privately via the Services (e.g. via private lessons or messages with other Users), the license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, publicly perform and publicly display such User Content for the sole purpose of enabling Tagpros to provide you with the Services.

You acknowledge and agree that any questions, comments, suggestions, ideas, feedback or other information about the Service (“Submissions”), provided by you to Tagpros are non-confidential and Tagpros will be entitled to the unrestricted use and dissemination of these Submissions for any purpose, commercial or otherwise, without acknowledgment or compensation to you.

You acknowledge and agree that Tagpros may preserve content and may also disclose content if required to do so by law or in the good faith belief that such preservation or disclosure is reasonably necessary to: (a) comply with legal process, applicable laws or government requests; (b) enforce these Terms of Service; (c) respond to claims that any content violates the rights of third parties; or (d) protect the rights, property, or personal safety of Tagpros, its users and the public. You understand that the technical processing and transmission of the Service, including your content, may involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.

**Copyright Complaints:** Tagpros respects the intellectual property of others, and we ask our users to do the same. If you believe that your work has been copied in a way that constitutes copyright infringement, or that your intellectual property rights have been otherwise violated, you should notify Tagpros of your infringement claim in accordance with the procedure set forth below.

Tagpros will process and investigate notices of alleged infringement and will take appropriate actions under the Digital Millennium Copyright Act (“DMCA”) and other applicable intellectual property laws with respect to any alleged or actual infringement. A notification of claimed copyright infringement should be emailed to Tagpros’s Copyright Agent at [scouts@tagpros.us](mailto:scouts@tagpros.us) (Subject line: “DMCA Takedown Request”). 

To be effective, the notification must be in writing and contain the following information:

*   an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other intellectual property interest;
*   a description of the copyrighted work or other intellectual property that you claim has been infringed;
*   a description of where the material that you claim is infringing is located on the Service, with enough detail that we may find it on the Service;
*   your address, telephone number, and email address;
*   a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright or intellectual property owner, its agent, or the law;
*   a statement by you, made under penalty of perjury, that the above information in your Notice is accurate and that you are the copyright or intellectual property owner or authorized to act on the copyright or intellectual property owner’s behalf.

    **Counter-Notice:** If you believe that your User Content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner’s agent, or pursuant to the law, to upload and use the content in your User Content, you may send a written counter-notice containing the following information to the Copyright Agent:

*   your physical or electronic signature;
*   identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled;
*   a statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content; and
*   your name, address, telephone number, and email address, a statement that you consent to the jurisdiction of the federal court located within the Northern District of California and a statement that you will accept service of process from the person who provided notification of the alleged infringement.

If a counter-notice is received by the Copyright Agent, Tagpros will send a copy of the counter-notice to the original complaining party informing that person that it may replace the removed content or cease disabling it in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider, member or user, the removed content may be replaced, or access to it restored, in 10 to 14 business days or more after receipt of the counter-notice, at our sole discretion.

**Repeat Infringer Policy:** In accordance with the DMCA and other applicable law, Tagpros has adopted a policy of terminating, in appropriate circumstances and at Tagpros’s sole discretion, users who are deemed to be repeat infringers. Tagpros may also at its sole discretion limit access to the Service and/or terminate the memberships of any users who infringe any intellectual property rights of others, whether or not there is any repeat infringement.

**Third Party Websites**

The Service may provide, or third parties may provide, links or other access to other sites and resources on the Internet. Tagpros has no control over such sites and resources and Tagpros is not responsible for and does not endorse such sites and resources. You further acknowledge and agree that Tagpros will not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any content, events, goods or services available on or through any such site or resource. Any dealings you have with third parties found while using the Service are between you and the third party, and you agree that Tagpros is not liable for any loss or claim that you may have against any such third party.

**Social Networking Services**

You may enable or log in to the Service via various online third party services, such as social media and social networking services like Facebook or Twitter (“Social Networking Services”). By logging in or directly integrating these Social Networking Services into the Service, we make your online experiences richer and more personalized. To take advantage of this feature and capabilities, we may ask you to authenticate, register for or log into Social Networking Services on the websites of their respective providers. As part of such integration, the Social Networking Services will provide us with access to certain information that you have provided to such Social Networking Services, and we will use, store and disclose such information in accordance with our Privacy Policy. For more information about the implications of activating these Social Networking Services and Tagpros’s use, storage and disclosure of information related to you and your use of such services within Tagpros (including, but not limited to, your friend lists), please see our Privacy Policy. However, please remember that the manner in which Social Networking Services use, store and disclose your information is governed solely by the policies of such third parties, and Tagpros shall have no liability or responsibility for the privacy practices or other actions of any third party site or service that may be enabled within the Service.

In addition, Tagpros is not responsible for the accuracy, availability or reliability of any information, content, goods, data, opinions, advice or statements made available in connection with Social Networking Services. As such, Tagpros is not liable for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such Social Networking Services. Tagpros enables these features merely as a convenience and the integration or inclusion of such features does not imply an endorsement or recommendation.

**Indemnity and Release**

You agree to release, indemnify and hold Tagpros and its affiliates and their officers, employees, directors and agents (collectively, “Indemnitees”) harmless from any and all losses, damages, expenses, including reasonable attorneys’ fees, rights, claims, actions of any kind and injury (including death) arising out of or relating to your use of the Service, any User Content, your connection to the Service, your violation of these Terms of Service or your violation of any rights of another. If you are a California resident, you waive California Civil Code Section 1542, which says: “A general release does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of executing the release, which if known by him must have materially affected his settlement with the debtor.” If you are a resident of another jurisdiction, you waive any comparable statute or doctrine.

**Disclaimer of Warranties**

YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TAGPROS EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.

TAGPROS MAKES NO WARRANTY THAT (I) THE SERVICE WILL MEET YOUR REQUIREMENTS, (II) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS.

YOU ACKNOWLEDGE AND AGREE THAT ANY CRIMINAL BACKGROUND CHECKS CONDUCTED BY TAGPROS ON TEACHERS ARE SOLELY FOR ITS OWN BENEFIT. TAGPROS MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF USERS ON THE SITE OR SERVICE.

**Limitation of Liability**

YOU EXPRESSLY UNDERSTAND AND AGREE THAT TAGPROS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY DAMAGES, OR DAMAGES FOR LOSS OF PROFITS INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF TAGPROS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, RESULTING FROM: (I) THE USE OR THE INABILITY TO USE THE SERVICE; (II) THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE SERVICE; (III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; (IV) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE; OR (V) ANY OTHER MATTER RELATING TO THE SERVICE. IN NO EVENT WILL TAGPROS’S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES OR CAUSES OF ACTION EXCEED THE AMOUNT YOU HAVE PAID TAGPROS IN THE LAST SIX (6) MONTHS, OR, IF GREATER, ONE HUNDRED DOLLARS ($100).

SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OR EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS SET FORTH ABOVE MAY NOT APPLY TO YOU OR BE ENFORCEABLE WITH RESPECT TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SERVICE OR WITH THESE TERMS OF SERVICE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF THE SERVICE.

IF YOU ARE A USER FROM NEW JERSEY, THE FOREGOING SECTIONS TITLED “DISCLAIMER OF WARRANTIES” AND “LIMITATION OF LIABILITY” ARE INTENDED TO BE ONLY AS BROAD AS IS PERMITTED UNDER THE LAWS OF THE STATE OF NEW JERSEY. IF ANY PORTION OF THESE SECTIONS IS HELD TO BE INVALID UNDER THE LAWS OF THE STATE OF NEW JERSEY, THE INVALIDITY OF SUCH PORTION SHALL NOT AFFECT THE VALIDITY OF THE REMAINING PORTIONS OF THE APPLICABLE SECTIONS.

**Dispute Resolution By Binding Arbitration: PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR RIGHTS**

**Agreement to Arbitrate:** This Dispute Resolution by Binding Arbitration section is referred to in this Terms of Service as the “Arbitration Agreement.” You agree that any and all disputes or claims that have arisen or may arise between you and Tagpros, whether arising out of or relating to this Terms of Service (including any alleged breach thereof), the Services, any advertising, any aspect of the relationship or transactions between us, shall be resolved exclusively through final and binding arbitration, rather than a court, in accordance with the terms of this Arbitration Agreement, except that you may assert individual claims in small claims court, if your claims qualify. Further, this Arbitration Agreement does not preclude you from bringing issues to the attention of federal, state, or local agencies, and such agencies can, if the law allows, seek relief against us on your behalf. You agree that, by entering into this Terms of Service, you and Tagpros are each waiving the right to a trial by jury or to participate in a class action. Your rights will be determined by a neutral arbitrator, not a judge or jury. The Federal Arbitration Act governs the interpretation and enforcement of this Arbitration Agreement.

**Prohibition of Class and Representative Actions and Non-Individualized Relief:** YOU AND TAGPROS AGREE THAT EACH OF US MAY BRING CLAIMS AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION OR PROCEEDING. UNLESS BOTH YOU AND TAGPROS AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON’S OR PARTY’S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A CONSOLIDATED, REPRESENTATIVE, OR CLASS PROCEEDING. ALSO, THE ARBITRATOR MAY AWARD RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ONLY IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF NECESSITATED BY THAT PARTY’S INDIVIDUAL CLAIM(S).

**Pre-Arbitration Dispute Resolution:** Tagpros is always interested in resolving disputes amicably and efficiently, and most customer concerns can be resolved quickly and to the customer’s satisfaction by emailing customer support at scouts@tagpros.us. If such efforts prove unsuccessful, a party who intends to seek arbitration must first send to the other, by certified mail, a written Notice of Dispute (“Notice”). The Notice to Tagpros should be sent to Tagpros, Inc. Lot 6 B, Blk 4 Del Rey St., Greenfields 3 Novaliches Q.C., **Philippines** (“Notice Address”). The Notice must (i) describe the nature and basis of the claim or dispute and (ii) set forth the specific relief sought. If Tagpros and you do not resolve the claim within sixty (60) calendar days after the Notice is received, you or Tagpros may commence an arbitration proceeding. During the arbitration, the amount of any settlement offer made by Tagpros or you shall not be disclosed to the arbitrator until after the arbitrator determines the amount, if any, to which you or Tagprosl is entitled.

**Arbitration Procedures:** Arbitration will be conducted by a neutral arbitrator in accordance with the American Arbitration Association’s (“AAA”) rules and procedures, including the AAA’s Supplementary Procedures for Consumer-Related Disputes (collectively, the “AAA Rules”), as modified by this Arbitration Agreement. For information on the AAA, please visit its website, [https://www.adr.org/](https://www.adr.org/). Information about the AAA Rules and fees for consumer disputes can be found at the AAA’s consumer arbitration page,  [https://www.adr.org/consumer](https://www.adr.org/consumer). If there is any inconsistency between any term of the AAA Rules and any term of this Arbitration Agreement, the applicable terms of this Arbitration Agreement will control unless the arbitrator determines that the application of the inconsistent Arbitration Agreement terms would not result in a fundamentally fair arbitration. The arbitrator must also follow the provisions of these Terms of Service as a court would. All issues are for the arbitrator to decide, including, but not limited to, issues relating to the scope, enforceability, and arbitrability of this Arbitration Agreement. Although arbitration proceedings are usually simpler and more streamlined than trials and other judicial proceedings, the arbitrator can award the same damages and relief on an individual basis that a court can award to an individual under the Terms of Service and applicable law. Decisions by the arbitrator are enforceable in court and may be overturned by a court only for very limited reasons.

Unless Tagpros and you agree otherwise, any arbitration hearings will take place in a reasonably convenient location for both parties with due consideration of their ability to travel and other pertinent circumstances. If the parties are unable to agree on a location, the determination shall be made by AAA. If your claim is for $10,000 or less, Tagpros agrees that you may choose whether the arbitration will be conducted solely on the basis of documents submitted to the arbitrator, through a telephonic hearing, or by an in-person hearing as established by the AAA Rules. If your claim exceeds $10,000, the right to a hearing will be determined by the AAA Rules. Regardless of the manner in which the arbitration is conducted, the arbitrator shall issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the award is based.

**Costs of Arbitration:** Payment of all filing, administration, and arbitrator fees (collectively, the “Arbitration Fees”) will be governed by the AAA Rules, unless otherwise provided in this Arbitration Agreement. If the value of the relief sought is $75,000 or less, at your request, Tagpros will pay all Arbitration Fees. If the value of relief sought is more than $75,000 and you are able to demonstrate to the arbitrator that you are economically unable to pay your portion of the Arbitration Fees or if the arbitrator otherwise determines for any reason that you should not be required to pay your portion of the Arbitration Fees, Tagpros will pay your portion of such fees. In addition, if you demonstrate to the arbitrator that the costs of arbitration will be prohibitive as compared to the costs of litigation, Tagpros will pay as much of the Arbitration Fees as the arbitrator deems necessary to prevent the arbitration from being cost-prohibitive. Any payment of attorneys’ fees will be governed by the AAA Rules.

**Confidentiality:** All aspects of the arbitration proceeding, and any ruling, decision, or award by the arbitrator, will be strictly confidential for the benefit of all parties.

**Severability:** If a court or the arbitrator decides that any term or provision of this Arbitration Agreement (other than the subsection (b) titled “Prohibition of Class and Representative Actions and Non-Individualized Relief” above) is invalid or unenforceable, the parties agree to replace such term or provision with a term or provision that is valid and enforceable and that comes closest to expressing the intention of the invalid or unenforceable term or provision, and this Arbitration Agreement shall be enforceable as so modified. If a court or the arbitrator decides that any of the provisions of subsection (b) above titled “Prohibition of Class and Representative Actions and Non-Individualized Relief” are invalid or unenforceable, then the entirety of this Arbitration Agreement shall be null and void. The remainder of the Terms of Service will continue to apply.

**Future Changes to Arbitration Agreement:** Notwithstanding any provision in this Terms of Service to the contrary,Tagpros agrees that if it makes any future change to this Arbitration Agreement (other than a change to the Notice Address) while you are a user of the Services, you may reject any such change by sending Tagpros written notice within thirty (30) calendar days of the change to the Notice Address provided above. By rejecting any future change, you are agreeing that you will arbitrate any dispute between us in accordance with the language of this Arbitration Agreement as of the date you first accepted these Terms of Service (or accepted any subsequent changes to these Terms of Service).

**Termination**

You agree that Tagpros, in its sole discretion, may suspend or terminate your account (or any part thereof) or use of the Service and remove and discard any content within the Service, for any reason, including, without limitation, for lack of use or if Tagpros believes that you have violated or acted inconsistently with the letter or spirit of these Terms of Service. Any suspected fraudulent, abusive or illegal activity that may be grounds for termination of your use of Service, may be referred to appropriate law enforcement authorities. Tagpros may also in its sole discretion and at any time discontinue providing the Service, or any part thereof, with or without notice. You agree that any termination of your access to the Service under any provision of this Terms of Service may be effected without prior notice, and acknowledge and agree that Tagpros may immediately deactivate or delete your account and all related information and files in your account and/or bar any further access to such files or the Service. Further, you agree that Tagpros will not be liable to you or any third party for any termination of your access to the Service.

**User Disputes**

You agree that you are solely responsible for your interactions with any other user in connection with the Service and Tagpros will have no liability or responsibility with respect thereto.

Tagpros reserves the right, but has no obligation, to become involved in any way it deems necessary with disputes between you and any other user of the Service.

**Your Privacy**

At Tagpros, we respect the privacy of our users. For details please see our Privacy Policy. By using the Service, you consent to our collection and use of personal data as outlined therein.

**Questions? Concerns? Suggestions?**

Please contact us at [scouts@tagpros.us](mailto:scouts@tagpros.us) to report any violations of these Terms of Service or to pose any questions regarding this Terms of Service or the Service.
  `;
  const [showTermsAndConditionsModal, toggleTermsAndConditionsModal] = useToggle();
  return (
    <Fragment>
      <CheckBoxControl
        name='agree'
        label={
          <div>
            I agree to all the
            <Link
              to='/terms'
              onClick={e => {
                e.preventDefault();
                toggleTermsAndConditionsModal();
              }}
            >
              {`   Terms and Conditions`}
            </Link>
          </div>
        }
      />

      <Modal
        show={showTermsAndConditionsModal}
        style={{ color: 'black' }}
        onHide={toggleTermsAndConditionsModal}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '50vh', overflowY: 'auto' }}>
          <ReactMarkdown className='text-black lead'>{terms}</ReactMarkdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={toggleTermsAndConditionsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const ToastWrapper = styled.div`
  small {
    display: inline-block;
  }
  border: red black 2px;
  display: grid;
  justify-content: center;
  text-align: center;
  .email {
    max-width: 100%;
    display: flex;
    justify-content: center;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    margin: 0 auto;
  }
`;
const SuccessToast = ({ email, type, provider }) => {
  if (type === USER_TYPE.SCHOOL_LEADER.toUpperCase())
    return (
      <ToastWrapper>
        <h3>Registration Success</h3>
        <small>{`Congratulations! 🥳`}</small>
        <small>Your registration is under review.</small>
        <small>You will be notified through</small>
        <small className='email'>{email}</small>
        <small>once it has been approved.</small>
      </ToastWrapper>
    );
  return (
    <ToastWrapper>
      <h3>Registration Success</h3>
      <small>{`Congratulations! 🥳`}</small>
      {provider === 'none' && (
        <Fragment>
          <small>To verify your account, </small>
          <small>{`Kindly click the link sent to`}</small>
          <small className='email'>{email}</small>
        </Fragment>
      )}
    </ToastWrapper>
  );
};

const SchoolDistrictFieldsWrapper = styled.div`
  display: grid;
  gap: 2rem;
`;

const SchoolDistrictFields = ({ values }) => {
  const [type, seTtype] = useState(null);
  const [schoolTypes, setSchoolTypes] = useState(null);
  useEffect(() => {
    seTtype(values.type);
  }, [values.type]);
  useEffect(() => {
    if (!schoolTypes) {
      getSchoolTypes()
        .then(setSchoolTypes)
        .catch(err => {
          console.log('🚀 ~ file: Register.jsx ~ line 30 ~ useEffect ~ err', err);
          toast('An unexpected error occurred. Please try again later.', {
            type: 'error'
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolTypes?.length]);

  if (type !== USER_TYPE.SCHOOL_LEADER.toUpperCase()) return <Fragment />;
  return (
    <SchoolDistrictFieldsWrapper>
      <InputControl required name='schoolName' label='Your Institution/School Name' />
      <SelectControl
        required
        name='schoolType'
        label='School Type'
        options={
          !schoolTypes
            ? []
            : schoolTypes.map(({ id: value, name: label }) => ({ label, value }))
        }
      />
      <SelectControl
        required
        name='country'
        label='Country'
        options={Country.getAllCountries().map(({ isoCode, flag, name }) => ({
          label: `${flag} ${name}`,
          value: isoCode
        }))}
      />
      <SelectControl
        required
        name='hiring'
        label='I am currently looking to hire teachers for my school(s)'
        options={[
          { label: 'Yes', value: 0 },
          { label: 'Not Right Now', value: 1 },
          { label: 'No', value: 2 }
        ]}
      />
      <TextAreaControl name='recHelp' label='How can we help with your recruitment?' />
    </SchoolDistrictFieldsWrapper>
  );
};

const AlreadyHaveAnAccount = () => (
  <div className='form-group m-b-0'>
    <div className='col-sm-12 text-center'>
      <p className='text-center'>
        Already have an account?
        <br />
        <Link className='text-info m-l-5' to='/login'>
          <b>Sign In</b>
        </Link>
      </p>
    </div>
  </div>
);
const SubmitButton = ({ valid, submitting, values }) => {
  // const proceedNextStep = () => {
  //   let nextStep = values.step + 1;
  //   const canChooseSocialAuth = USER_TYPES_CAN_SOCIAL_AUTH.includes(values.type);
  //   if (/* !canChooseSocialAuth */ !!values.provider && !!values.type) {
  //     form.change('step', nextStep);
  //   }
  // };
  const atLastStep = values.step === 2;
  if (atLastStep)
    return (
      <button
        class='btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light'
        type='submit'
        disabled={!valid || submitting}
      >
        {submitting ? 'Submitting' : 'Register'}
      </button>
    );
  else return <Fragment />;
};

const UserTypeOption = ({ label, user, description, image, input }) => {
  const isActive = useField('type').input.value === user;
  return (
    <label className={`btn btn-secondary shadow-none ${isActive ? 'active' : ''} `}>
      <input type='radio' {...input} />
      <img
        src={image}
        style={{
          marginBottom: 10,
          height: 160,
          width: 160,
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        alt={label}
      />
      <br />
      <b>{label}</b>
      <br />
      <small className='text-center'>{description}</small>
    </label>
  );
};
const UserTypeSelectorWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 200px;
  justify-content: center;
  align-items: center;
  @media (min-width: 1000px) {
    grid-template-columns: 200px 200px;
  }
  @media (min-width: 1580px) {
    grid-template-columns: 200px 200px 200px 200px;
  }
`;
const UserTypeSelector = () => {
  const userTypes = [
    {
      value: 'FAMILY',
      label: 'Family',
      description: 'Recommended for parents and guardians.',
      image: './assets/images/reg01.png'
    },
    {
      value: 'LEARNER',
      label: 'Learner',
      description: 'For users who want control over their education.',
      image: './assets/images/reg02.png'
    },
    {
      value: 'TEACHER',
      label: 'Teacher',
      description: 'Become a Tagpros Teacher!',
      image: './assets/images/reg03.png'
    },
    {
      value: USER_TYPE.SCHOOL_LEADER.toUpperCase(),
      label: 'School Leader',
      description: 'Join and observe our Teachers!',
      image: './assets/images/reg04.jpg'
    }
  ];
  return (
    <UserTypeSelectorWrapper>
      {userTypes.map(props => (
        <Field
          type='radio'
          name='type'
          {...props}
          key={props.value}
          user={props.value}
          component={UserTypeOption}
        />
      ))}
    </UserTypeSelectorWrapper>
  );
};

const FieldsWrapper = styled.div`
  display: grid;
  gap: 2rem;
  @media (min-width: 1000px) {
    & *:nth-child(3) {
      grid-column: 1/3;
    }
  }
`;

const FormWrapper = styled.form`
  position: relative;
  input {
    width: 100% !important;
  }
  select {
    width: 100% !important;
  }
  textarea {
    height: 10rem;
  }
`;
const Loader = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: none;
  pointer-events: none;
  display: ${({ show }) => show && 'flex'};
  pointer-events: ${({ show }) => show && 'all'};
  z-index: 100;
  align-items: center;
  justify-content: center;
`;
const Register = () => {
  const [searchParams] = useSearchParams();
  useFreshdeskHelpWidget();
  const dispatch = useDispatch();
  const convertSearchParamsToObject = () => {
    const obj = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    console.log("obj ",obj)
    return obj;
  };

  // Simplify code
  let initialValues = {
    type: null,
    country: 'US',
    step: 1,
    provider: null,
    ...{ ...convertSearchParamsToObject() }
  };

  // Omit
  // if (searchParams.get('type') !== null) {
  //   if (searchParams.get('type') === 'TEACHER') {
  //     initialValues = {
  //       type: 'TEACHER',
  //       country: 'US',
  //       step: 1,
  //       provider: null
  //     };
  //   }
  //   if (searchParams.get('type') === 'LEARNER') {
  //     initialValues = {
  //       type: 'LEARNER',
  //       country: 'US',
  //       step: 1,
  //       provider: null
  //     };
  //   }
  //   if (searchParams.get('type') === 'SCHOOL_LEADER') {
  //     initialValues = {
  //       type: 'SCHOOL_LEADER',
  //       country: 'US',
  //       step: 1,
  //       provider: null
  //     };
  //   }
  // }

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const { signOut: googleLogout } = useGoogleLogout({
    clientId: googleClientId,
    onFailure: e => {
      throw e;
    },
    scope: ''
  });

  const socialLogout = async () => {
    googleLogout();
  };
  const { signIn: googleLogin } = useGoogleLogin({
    onSuccess: ({
      profileObj: { imageUrl: photo, email, givenName: firstName, familyName: lastName },
      tokenId: authToken
    }) => {
      window.form.change('provider', 'google');
      window.form.change('firstName', firstName);
      window.form.change('lastName', lastName);
      window.form.change('email', email);
      window.form.change('provider', 'google');
      window.form.change('photo', photo);
      window.form.change('authToken', authToken);
      dispatch(setSocialAuthToken(authToken));
    },
    clientId: googleClientId,
    onFailure: e => {
      window.form.change('step', 1);
      throw e;
    },
    scope: ''
  });

  const emailLogin = () => {
    window.form.change('provider', 'none');
  };
  const handleClickSelectProvider = async provider => {
    const handler = provider === 'google' ? googleLogin : emailLogin;
    try {
      socialLogout();
      window.form.change('provider', provider);
      await handler();
      window.form.change('step', 2);
    } catch (error) {
      window.form.change('step', 1);
      console.error(error);
    }
  };
  // Old
  // const privacyPolicyLink = 'https://docs.google.com/document/d/19uVyAFLdBkYc7xkxKN_SxzrNvhbPHbEBzds_D66sGmE/edit#'
  // New
  const navigate = useNavigate();
  const submit = async values => {
    try {
      await toast.promise(
        submitRegistration(dispatch, values),
        {
          success: {
            render() {
              return (
                <SuccessToast
                  type={values.type}
                  email={values.email}
                  provider={values.provider}
                />
              );
            }
          },
          pending: 'Submitting...',
          error: {
            render({ data }) {
              return (
                data.response?.data?.message ||
                'An unexpected error occurred. Please try again later.'
              );
            }
          }
        },
        { position: toast.POSITION.TOP_RIGHT, autoClose: false }
      );
      if (values.provider === 'none') navigate('/login');
      else dispatch(setAccountType(values.type.toLowerCase()));

      setHasEverLoggedIn(true);
    } catch (error) {
      console.error('🚀 ~ file: Register.jsx ~ line 265 ~ Register ~ error', error);
      throw error;
    }
  };
  const validate = useValidationSchema(schema);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const registerAs = (e, provider, type, form, renderProps) => {
    if (type) {
      if (provider === 'none') {
        handleClickSelectProvider('none');
      } else {
        if (!form && !renderProps) {
          handleClickSelectProvider(provider);
        } else {
          e.preventDefault();
          form.change('provider', provider);
          renderProps.onClick();
        }
      }
    } else {
      toast('Please select an Account Type', {
        type: 'warning'
      });
    }
  };

  return (
    <Form
      // decorators={[calculator]}
      onSubmit={submit}
      initialValues={initialValues}
      validate={validate}
      style={{ position: 'relative' }}
      subscription={{values: true}}
    >
      {({ handleSubmit, submitting, values, form }) => {
        window.form = form;
        return (
          <>
            <Loader show={submitting}>
              <div className='spinner-border text-primary' role='status' />
            </Loader>
            <FormWrapper
              onSubmit={handleSubmit}
              id='wrapper'
              className='login-register login-sidebar pb-5 form-horizontal form-material p-5'
              style={{
                backgroundImage: 'url(./assets/images/loginbg01.png)'
              }}
            >
              <div className='login-box login-box-left card  mb-5'>
                <div className='card-body'>
                  <div
                    style={{
                      display: 'grid',
                      gap: '4rem',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Fragment>
                      <a
                        class='text-center db'
                        href='/'
                        style={{ color: 'black !important' }}
                      >
                        <img src='./assets/images/logo-icon.png' alt='Home' />
                        <br />
                        <img src='./assets/images/logo-text.png' alt='Home' />
                      </a>
                      <div class='text-center'>
                        <h3 class='box-title'>Create a Tagpros Account</h3>
                        {values.type ? (
                          <h4>
                            Signing up as{' '}
                            {_.startCase(
                              _.lowerCase(
                                values.type === 'SCHOOL_LEADER'
                                  ? 'SCHOOL_DISTRICT'
                                  : values.type
                              )
                            )}
                          </h4>
                        ) : (
                          ''
                        )}
                        {!!values.provider && (
                          <h5>
                            <span className='mr-2'>
                              {
                                SOCIAL_AUTH_PROVIDERS.find(
                                  ({ provider }) => provider === values.provider
                                )?.icon
                              }
                            </span>

                            <span>
                              {
                                SOCIAL_AUTH_PROVIDERS.find(
                                  ({ provider, label }) => provider === values.provider
                                )?.label
                              }
                            </span>
                          </h5>
                        )}
                        <small>
                          {values.step === 1 &&
                            'Kindly choose an account type, and a Sign up method below'}
                          {values.step === 2 &&
                            'Kindly fill up and verify the form below to begin your Tagpros Education journey.'}
                        </small>
                        <div className='w-100 d-flex justify-content-between mt-5 align-items-center'>
                          {values.step > 1 && (
                            <Button
                              type='button'
                              style={{ borderRadius: 99999 }}
                              variant='info'
                              onClick={() => {
                                form.change('step', values.step - 1);
                                form.change('provider', null);
                              }}
                              className='d-flex justify-content-center align-items-center'
                            >
                              <ArrowLeftCircle size={25} className='mr-2' />
                              <span style={{ fontSize: 13 }}>
                                Change Account type / Sign up method
                             </span>
                            </Button>
                          )}
                          {/* {!!values.step === 2 && (
                            <Button
                              type='button'
                              onClick={() => form.change('step', values.step + 1)}
                              style={{ borderRadius: 99999 }}
                              variant='info'
                            >
                              <ArrowRightCircle size={25} />
                            </Button>
                          )} */}
                        </div>
                      </div>
                    </Fragment>

                    {
                    // eslint-disable-next-line eqeqeq
                    values.step == 1 && (
                      <Fragment>
                        <UserTypeSelector />
                        <div style={{ display: 'grid', gap: 5 }}>
                          {SOCIAL_AUTH_PROVIDERS.map(({ label, icon, provider }) =>
                            provider === 'facebook' ? (
                              <FacebookLogin
                                key={provider}
                                fields='email,first_name,last_name'
                                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                onSuccess={({ accessToken }) => {
                                  window.form.change('authToken', accessToken);
                                  dispatch(setSocialAuthToken(accessToken));
                                }}
                                onProfileSuccess={({ email, first_name, last_name }) => {
                                  window.form.change('email', email);
                                  window.form.change('firstName', first_name);
                                  window.form.change('lastName', last_name);
                                  form.change('step', 2);
                                }}
                                onFail={() => form.change('step', 1)}
                                render={renderProps => (
                                  <Button
                                    disabled={values.type === 'SCHOOL_LEADER'}
                                    key={provider}
                                    active={values.provider === provider}
                                    type='button'
                                    className='d-flex w-100 my-2'
                                    variant='light'
                                    onClick={e => {
                                      registerAs(
                                        e,
                                        provider,
                                        values.type,
                                        form,
                                        renderProps
                                      );
                                    }}
                                  >
                                    {icon}
                                    <div
                                      key={provider}
                                      className='ml-3 text-center w-100'
                                    >
                                      Sign up with <b>{label}</b>
                                    </div>
                                  </Button>
                                )}
                              />
                            ) : (
                              <Button
                                disabled={values.type === 'SCHOOL_LEADER'}
                                key={provider}
                                active={values.provider === provider}
                                type='button'
                                className='d-flex w-100 my-2'
                                variant='light'
                                onClick={e => {
                                  registerAs(e, provider, values.type, null, null);
                                }}
                              >
                                {icon}
                                <div key={provider} className='ml-3 text-center w-100'>
                                  Sign up with <b>{label}</b>
                                </div>
                              </Button>
                            )
                          )}
                          <h6 className='w-100 text-center'>or</h6>
                          <Button
                            active={values.provider === 'none'}
                            key={'mail'}
                            className='d-flex w-100'
                            variant='light'
                            onClick={e => {
                              registerAs(e, 'none', values.type, null, null);
                            }}
                          >
                            <AtSign />
                            <div className='ml-3 text-center w-100'>
                              Sign up with other Email
                            </div>
                          </Button>
                        </div>
                      </Fragment>
                    )}
                    {
                    // eslint-disable-next-line eqeqeq
                    values.step == 2 && (
                      <Fragment>
                        <FormSpy
                          subscription={{ values: true }}
                          component={SchoolDistrictFields}
                        />
                        <FieldsWrapper>
                          <InputControl required name='firstName' label='First Name' />
                          <InputControl required name='lastName' label='Last Name' />
                          <InputControl
                            required
                            name='email'
                            label='Email'
                            disabled={values.provider !== 'none'}
                          />
                          {values.provider === 'none' && (
                            <Fragment>
                              <InputControl
                                required
                                name='password'
                                label='Password'
                                type='password'
                              />
                              <InputControl
                                required
                                name='password2'
                                label='Confirm Password'
                                type='password'
                              />
                            </Fragment>
                          )}
                        </FieldsWrapper>
                        <FormSpy
                          component={AgreeToTermsCheckbox}
                          subscription={{ values: true }}
                        />
                      </Fragment>
                    )}

                    <FormSpy
                      subscription={{
                        valid: true,
                        invalid: true,
                        submitting: true,
                        values: true,
                        initialValues: true
                      }}
                      component={SubmitButton}
                    />
                    <AlreadyHaveAnAccount />
                  </div>
                </div>
              </div>
            </FormWrapper>
          </>
        );
      }}
    </Form>
  );
};

export default Register;
