import { Container } from '../../style';
import img1 from '../../img/earningsAndRefunds.png';

const EarningsAndRefunds = () => {
  return (
    <Container>
      <p>
        The teachers can choose from the list of predetermined prices of their class (set
        by Tagpros), as well as the minimum and maximum class size. Tagpros will take 30%
        of the class earnings while the teacher will receive the remaining 70% (subject to
        VAT and withholding income tax, for a net pay of approximately 55%).{' '}
      </p>
      <p>A sample computation of a teacher’s payout is given below</p>
      <p>
        Number of students in the class: 5 <br />
        Listed price per student: USD 50
      </p>
      <p>&nbsp;</p>
      <table>
        <tr>
          <td>Gross Amount (5 students x USD 50)</td>
          <td>250</td>
        </tr>
        <tr>
          <td>Less: VAT (12%)</td>
          <td>(26.79)</td>
        </tr>
        <tr>
          <td>
            <b>Net Amount (shared between Tagpros and teacher)</b>
          </td>
          <td>
            <b>223.21</b>
          </td>
        </tr>
        <tr>
          <td>Less: Tagpros’ share in Net Amount (30%)</td>
          <td>(66.96)</td>
        </tr>
        <tr>
          <td>
            <b>Teacher’s share in Net Amount</b>
          </td>
          <td>
            <b>156.25</b>
          </td>
        </tr>
        <tr>
          <td>Less: Withholding income taxes (10% of teacher’s share in net amount)</td>
          <td>(15.63)</td>
        </tr>
        <tr>
          <td>
            <b>Credit to teacher’s account</b>
          </td>
          <td>
            <b>140.62 (56%)</b>
          </td>
        </tr>
      </table>
      <p>&nbsp;</p>
      <h3>Payout details</h3>
      <p>
        We send payouts to teachers using PayPal. For short classes (8 weeks or fewer),
        the teacher will receive payment for the class within 5-10 working days after the
        last session of the course. For long courses (more than 8 weeks), the payment will
        be given through installments, which will be paid within 5 working days at the end
        of each month within the duration of the course.
      </p>
      <p>&nbsp;</p>
      <h3>Linking the teacher's PayPal account</h3>
      <p>
        The teacher can provide the teacher's email address in the field “PayPal email” in
        the teacher's teacher’s profile. Please note that the teacher will need to
        <a
          href='https://www.paypal.com/us/webapps/mpp/account-selection'
          target='_blank'
          rel='noreferrer'
        >
          sign up for PayPal
        </a>{' '}
        if the teacher doesn’t have an account yet.
      </p>
      <img src={img1} alt='img1' style={{ margin: '20px' }} />
      <p>&nbsp;</p>
      <h3>Sending money back to Tagpros </h3>
      <p>
        In the case of a refund, the teacher will be giving the money back to us and we
        will distribute it to the parents or learners. We do not permit direct
        transactions from teachers to parents to ensure that all refunds are documented
        and secure. Refunds will be transacted through{' '}
        <a href='http://paypal.com' target='_blank' rel='noreferrer'>
          PayPal
        </a>{' '}
        and the money will be sent to the account the teacher are using at Tagpros. To
        learn more about our refund policies, click{' '}
        <a href='/enrollment-guide/refund-basics' target='_blank'>
          here
        </a>
        .
      </p>
      <p>
        Failure to comply with the protocol will be dealt with accordingly with{' '}
        <a href='/teachers-guide/miscellaneous-topics/teacher-removal' target='_blank'>
          restriction and removal
        </a>
        . The teacher will be given a warning after one week without payment. After two
        weeks without payment, the teacher's account will be suspended and all of the
        teacher's classes will be unlisted. We will also not approve any new classes that
        the teacher create.
      </p>
    </Container>
  );
};

export default EarningsAndRefunds;
