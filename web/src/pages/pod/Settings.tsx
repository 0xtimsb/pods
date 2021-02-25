import Container from "../../components/Container";

const Settings: React.FC = () => {
  return (
    <Container>
      <div className="flex-grow flex flex-col justify-center items-center space-y-8">
        <div className="text-gray-900 font-bold text-5xl">Settings</div>
        <div className="w-72 space-y-3"></div>
      </div>
    </Container>
  );
};

export default Settings;
