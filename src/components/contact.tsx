import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and Anon Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;



const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const Contact = () => {
  const [state, setState] = useState<ContactFormState>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    loading: false,
    success: false,
    error: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ ...state, loading: true, error: null, success: false });

    const { error } = await supabase
      .from('contactmessages')
      .insert([
        {
          firstname: state.firstName,
          secondname: state.lastName,
          email: state.email,
          subject: state.subject,
          message: state.message,
        },
      ]);

    if (error) {
      setState({ ...state, loading: false, error: error.message });
    } else {
      setState({
        ...state,
        loading: false,
        success: true,
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });
    }
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                Contact Us
              </h1>
              <p className="text-muted-foreground">
                We are available for questions, feedback, or collaboration
                opportunities. Let us know how we can help!
              </p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="justify-items-start">
                <li>
                  <span className="font-bold">Phone: </span>
                  (415) 251-0015
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href="" className="underline">
                    aieranatus@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10">
              {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}
              {state.success && (
                <p style={{ color: 'green' }}>Message sent successfully!</p>
              )}
              <div className="flex gap-4">
                <div className="grid w-full items-start gap-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    value={state.firstName}
                    onChange={(e) => setState({ ...state, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={state.lastName}
                    onChange={(e) => setState({ ...state, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={state.email}
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  value={state.subject}
                  onChange={(e) => setState({ ...state, subject: e.target.value })}
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  placeholder="Type your message here."
                  id="message"
                  value={state.message}
                  onChange={(e) => setState({ ...state, message: e.target.value })}
                  required
                />
              </div>
              <Button className="w-full" type="submit" disabled={state.loading}>
                {state.loading ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;