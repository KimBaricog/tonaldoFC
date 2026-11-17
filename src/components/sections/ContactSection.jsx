import Faq from './Faq'
import EnquiryForm from '../forms/EnquiryForm'

export default function ContactSection() {
  return (
    <section className="faqform" id="contact">
      <Faq />
      <EnquiryForm />
    </section>
  )
}
