import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Snap'em | snapem - userTables Dashboard"
        description="This is snap'em Basic Tables Dashboard page for snap'em "
      />
      <PageBreadcrumb pageTitle="All Users" />
      <div className="space-y-6">
        <ComponentCard title="Users Table">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
