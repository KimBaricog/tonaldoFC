import { useCallback, useEffect, useState } from 'react'
import { listAdmins } from '../../services/adminUsersService'
import ChangePasswordForm from './ChangePasswordForm'
import AddAdminForm from './AddAdminForm'
import AdminList from './AdminList'

export default function AdminAccounts({ email }) {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    try { setAdmins(await listAdmins()); setError('') }
    catch (err) { setError(`${err.message} (If this is your first time, the admin-users function may not be deployed yet. See SETUP-ADMINS.md.)`) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { reload() }, [reload])

  return (
    <>
      <AdminList admins={admins} loading={loading} error={error} onChanged={reload} />
      <AddAdminForm onAdded={reload} />
      <ChangePasswordForm email={email} />
    </>
  )
}
