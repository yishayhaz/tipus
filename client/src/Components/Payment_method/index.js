import Tag from '../Tag';
import { SmileIcon, SadIcon } from '../../ReSources/Icons';

export default (index) => {
  switch (index) {
    case 0:
      return PaymentMethod0();
    case 1:
      return PaymentMethod1();
    case 2:
      return PaymentMethod2();
    case 3:
      return PaymentMethod3();
    default:
      return PaymentMethod0();
  }
}

function PaymentMethod0() {
  // אתם מקבלים שכר בסיס, ובנוסף מקבלים את הטיפים ישירות אליכם.
  return <Tag type={"success"}>משכורת + טיפים <SmileIcon /></Tag>
}
function PaymentMethod1() {
  // אתם מקבלים שכר בסיס, והצוות מתחלק בכל הטיפים.
  return <Tag type={"success"}>הצוות חולק בטיפים <SmileIcon /></Tag>
}
function PaymentMethod2() {
  // אתם מקבלים שכר בסיס, אבל הטיפים לא מגיעים אליכם.
  return <Tag type={"error"}>משכורת בלבד <SadIcon /></Tag>
}
function PaymentMethod3() {
  // אתם לא מקבלים שכר בסיס, אבל מקבלים את כל הטיפים
  return <Tag type={"error"}>הטיפים למעסיק <SadIcon /></Tag>
}