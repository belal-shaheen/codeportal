import { Auth, Typography, Button } from "@supabase/ui";
const { Text } = Typography;
import { supabase } from "../api";
import Layout from "../components/Layout";

function Profile(props) {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
        <Text>Signed in: {user.email}</Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  return props.children;
}

export default function AuthProfile() {
  return (
    <Layout>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Profile supabaseClient={supabase}>
          <div className="flex">
            <Auth className="w-4" supabaseClient={supabase} />
          </div>
        </Profile>
      </Auth.UserContextProvider>
    </Layout>
  );
}
