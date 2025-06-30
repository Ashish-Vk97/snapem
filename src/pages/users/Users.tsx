import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import UserTable from "../../components/users/UserTable";

export default function Users() {
  return (
    <>
      <PageMeta
        title="Snapem User Dashboard | Snap'em "
        description="This is snap'em User Dashboard page for snap'em "
      />
      <PageBreadcrumb pageTitle="All Users" />
      <div className="space-y-6">
        <ComponentCard title="Users Table">
         < UserTable/>
        </ComponentCard>
      </div>
    </>
  );
}
