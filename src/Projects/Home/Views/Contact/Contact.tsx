import { FC, FormEvent } from 'react'
import '../../styles/Contact-view.css'

interface FormInputs {
  name: HTMLInputElement
  email: HTMLInputElement
  message: HTMLTextAreaElement
}
interface ContactProps { id?: string, getText: (key: string) => string }
export const Contact: FC<ContactProps> = ({ id, getText }) => {

  const contactMe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as typeof e.target & FormInputs
    const { name, email, message } = target
    // send data to my back-end
    name
    email
    message
  }

  return <form id={id || ''} className='Home-Contact-Form' onSubmit={contactMe}>
    <div className='home-contact-group'>
      <label htmlFor='home-contact-name'>{getText('contactFormNameLabel')}</label>
      <input name='name' id='home-contact-name' required autoComplete='false' type='text' placeholder={getText('contactFormNamePlaceholder')} />
    </div>
    <div className='home-contact-group'>
      <label htmlFor='home-contact-mail'>{getText('contactFormEmailLabel')}</label>
      <input name='email' id='home-contact-mail' required autoComplete='false' type='email' placeholder={getText('contactFormEmailPlaceholder')} />
    </div>
    <label htmlFor='home-contact-message'>{getText('contactFormMessageLabel')}</label>
    <textarea id='home-contact-message' name='message' required placeholder={getText('contactFormMessagePlaceHolder')} />
    <button>{getText('contactFormSendButton')}</button>
  </form>
}
